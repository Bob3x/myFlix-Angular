/**
 * User Profile Component
 * @file user-profile.component.ts
 * @description Manages user profile data and favorite movies
 */

/**
 * Removes a movie from user's favorites
 * @method deleteFavoriteMovie
 * @param {string} movieId - ID of movie to remove
 * @description Updates both API and local state when removing favorites
 */
import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FetchApiDataService } from "../services/fetch-api-data.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { User } from "../models/user";
import { NavbarComponent } from "../navbar/navbar.component";

/**
 * Movie interface for favorite movies
 * @interface Movie
 * @description Defines structure for movie data
 */
interface Movie {
    _id: string;
    Title: string;
    ImagePath: string;
}

/**
 * User Profile Component
 * @class UserProfileComponent
 * @implements OnInit
 * @description Handles user profile management and favorite movies display
 */
@Component({
    selector: "app-user-profile",
    standalone: true,
    imports: [
        NavbarComponent,
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        RouterModule,
        MatGridListModule
    ],
    templateUrl: "./user-profile.component.html",
    styleUrl: "./user-profile.component.scss"
})
export class UserProfileComponent implements OnInit {
    hidePassword = true;

    /**
     * User profile form data
     * @property userData
     * @description Stores current user profile information
     */
    userData = {
        Username: "",
        Email: "",
        Password: "",
        Birthday: "",
        FavoriteMovies: [] as string[]
    };

    favoriteMovies: Movie[] = [];

    /**
     * Creates an instance of UserProfileComponent
     * @constructor
     * @param fetchApiData - Service for API calls
     * @param platformId - Platform identifier for SSR compatibility
     * @param snackBar - Material snackbar for notifications
     * @param router - Angular router service
     */
    constructor(
        private fetchApiData: FetchApiDataService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    /**
     * Initializes component
     * @method ngOnInit
     * @description Loads user data from localStorage and fetches favorite movies
     */
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                const user = JSON.parse(storedUser);

                this.userData = {
                    Username: user.Username || "",
                    Password: "",
                    Email: user.Email || "",
                    Birthday: user.Birthday || "",
                    FavoriteMovies: user.FavoriteMovies || []
                };
                if (this.userData.FavoriteMovies.length > 0) {
                    this.getFavoriteMovies(this.userData.FavoriteMovies);
                }
            }
        }
    }

    /**
     * Fetches full movie details for favorite movies
     * @method getFavoriteMovies
     * @param {string[]} movieIds - Array of favorite movie IDs
     * @description Retrieves complete movie information for user's favorites
     */
    getFavoriteMovies(movieIds: string[]): void {
        this.fetchApiData.getAllMovies().subscribe({
            next: (movies: Movie[]) => {
                this.favoriteMovies = movies.filter((movie) => movieIds.includes(movie._id));
            },
            error: (error) => {
                console.error("Error fetching favorite movies:", error);
            }
        });
    }

    /**
     * Removes movie from favorites
     * @method deleteFavoriteMovie
     * @param {string} movieId - ID of movie to remove
     * @description Updates both API and local state when removing favorites
     */

    deleteFavoriteMovie(movieId: string): void {
        if (isPlatformBrowser(this.platformId)) {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
                next: (response) => {
                    // Update local state
                    this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
                        (id) => id !== movieId
                    );

                    // Update localStorage
                    user.FavoriteMovies = this.userData.FavoriteMovies;
                    localStorage.setItem("user", JSON.stringify(user));

                    // Update displayed movies
                    this.favoriteMovies = this.favoriteMovies.filter(
                        (movie) => movie._id !== movieId
                    );

                    this.snackBar.open("Movie remove from favorites", "OK", {
                        duration: 2000
                    });
                },
                error: (error) => {
                    console.error("Error removing favorite movie:", error);
                    this.snackBar.open("Error removing favorite movie", "OK", {
                        duration: 2000
                    });
                }
            });
        }
    }

    /**
     * Removes movie from favorites
     * @method deleteFavoriteMovie
     * @param {string} movieId - ID of movie to remove
     * @description Updates both API and local state when removing favorites
     */
    updateUser(): void {
        if (!this.userData.Username) {
            this.snackBar.open("Username is required", "OK", {
                duration: 2000
            });
            return;
        }

        const updatedUser: Partial<User> = {
            Username: this.userData.Username,
            Email: this.userData.Email,
            Password: this.userData.Password, // Include password if provided
            Birthday: this.userData.Birthday ? new Date(this.userData.Birthday) : undefined,
            FavoriteMovies: this.userData.FavoriteMovies
        };

        // Only include password if it was changed
        if (!this.userData.Password) {
            delete updatedUser.Password;
        }

        this.fetchApiData.editUser(this.userData.Username, updatedUser).subscribe({
            next: (response) => {
                localStorage.setItem("user", JSON.stringify(response));
                this.snackBar.open("Profile updated successfully", "OK", {
                    duration: 2000
                });
            },
            error: (error) => {
                console.error("Update error:", error);
                this.snackBar.open("Failed to update profile", "OK", {
                    duration: 2000
                });
            }
        });
    }

    /**
     * Deletes user account
     * @method deleteUser
     * @description Handles account deletion with confirmation
     */

    deleteUser(): void {
        if (!this.userData.Username) {
            this.snackBar.open("Username not found", "OK", {
                duration: 2000
            });
            return;
        }

        if (confirm("Are you sure you want to delete your profile?")) {
            this.fetchApiData.deleteUser(this.userData.Username).subscribe({
                next: () => {
                    localStorage.clear();
                    this.router.navigate(["welcome"]);
                    this.snackBar.open("Account deleted successfully", "OK", {
                        duration: 2000
                    });
                },
                error: (error) => {
                    console.error("Delete error:", error);
                    this.snackBar.open("Failed to delete account", "OK", {
                        duration: 2000
                    });
                }
            });
        }
    }

    /**
     * Handles user logout
     * @method logout
     * @description Clears local storage and redirects to welcome page
     */
    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            //Clear all stored data
            localStorage.clear();

            // Show logout message
            this.snackBar.open("Logut successful!", "OK", {
                duration: 2000
            });

            // Navigate to welcome page
            this.router.navigate(["welcome"]);
        }
    }
}
