/**
 * User Registration Form Component
 * @file user-registration-form.component.ts
 * @description Handles new user registration with form validation and API integration
 */
import { Component, OnInit, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FetchApiDataService } from "../services/fetch-api-data.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

/**
 * Interface for API registration response
 * @interface RegistrationResponse
 * @description Defines the structure of the registration API response
 */
interface RegistrationResponse {
    user: {
        Username: string;
        Email: string;
        FavoriteMovies: string[];
    };
    token: string;
}

/**
 * User Registration Form Component
 * @class UserRegistrationFormComponent
 * @implements OnInit
 * @description Provides form interface for new user registration
 */
@Component({
    selector: "app-user-registration-form",
    imports: [FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule],
    standalone: true,
    templateUrl: "./user-registration-form.component.html",
    styleUrl: "./user-registration-form.component.scss"
})
export class UserRegistrationFormComponent implements OnInit {
    /**
     * User registration form data
     * @property userData
     * @type {Object}
     */
    userData = {
        Username: "",
        Password: "",
        Email: "",
        Birthday: ""
    };

    /**
     * Creates an instance of UserRegistrationFormComponent
     * @constructor
     * @param fetchApiData - Service for API calls
     * @param dialogRef - Reference to the dialog containing this form
     * @param snackBar - Service for showing notifications
     * @param router - Angular router service
     */
    constructor(
        private fetchApiData: FetchApiDataService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        private router: Router
    ) {}

    /** Lifecycle hook for component initialization */
    ngOnInit(): void {}

    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe({
            next: (response: RegistrationResponse) => {
                try {
                    // Store authentication data
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));

                    // Verify storage
                    const storedToken = localStorage.getItem("token");
                    const storedUser = localStorage.getItem("user");

                    if (!storedToken || !storedUser) {
                        throw new Error("Failed to save authentication data");
                    }

                    // Close dialog and show success message
                    this.dialogRef.close();
                    this.snackBar.open(
                        `Welcome ${response.user.Username}! Registration successful`,
                        "OK",
                        { duration: 2000 }
                    );

                    // Navigate to movies page
                    this.router.navigate(["movies"]);
                } catch (error) {
                    console.error("Storage error:", error);
                    this.snackBar.open("Registration successful but failed to save session", "OK", {
                        duration: 2000
                    });
                }
            },
            error: (error) => {
                console.error("Registration failed:", error);
                this.snackBar.open(error.error || "Registration failed", "OK", { duration: 2000 });
            }
        });
    }
}
