import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../services/fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { MatCard, MatCardModule } from "@angular/material/card";
import { NgFor } from "@angular/common";

interface Movie {
    _id: string;
    Title: string;
    Description: string;
    Genre: {
        Name: string;
        Description: string;
    };
    Director: {
        Name: string;
        Bio: string;
    };
    ImagePath: string;
    isFavorite?: boolean;
}

@Component({
    selector: "app-movie-card",
    standalone: true,
    imports: [MatCardModule, NgFor, MatCard],
    templateUrl: "./movie-card.component.html",
    styleUrl: "./movie-card.component.scss"
})
export class MovieCardComponent implements OnInit {
    movies: Movie[] = [];

    constructor(public fetchMovies: FetchApiDataService) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        try {
            const user = localStorage.getItem("user");
            if (!user) {
                console.warn("No user found in localStorage");
                return;
            }

            this.fetchMovies.getAllMovies().subscribe({
                next: (movies: Movie[]) => {
                    // Load movies first without favorites
                    this.movies = movies;
                    console.log("Movies loaded:", this.movies);

                    // Try to add favorites after
                    try {
                        const userData = JSON.parse(user);
                        if (userData && userData.FavoriteMovies) {
                            this.movies = movies.map((movie) => ({
                                ...movie,
                                isFavorite: userData.FavoriteMovies.includes(movie._id)
                            }));
                        }
                    } catch (parseError) {
                        console.error("Error parsing favorites:", parseError);
                    }
                },
                error: (error) => {
                    console.error("Error fetching movies:", error);
                }
            });
        } catch (error) {
            console.error("Error in getMovies:", error);
        }
    }
}
