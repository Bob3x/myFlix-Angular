import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

const apiUrl = "https://my-movies-flix-app-56f9661dc035.herokuapp.com/";

interface User {
    _id: string;
    Username: string;
    Password: string;
    Email: string;
    Birthday: Date;
    FavoriteMovies: Array<string>;
}

interface UserDetails {
    Username: string;
    Password: string;
    Email: string;
    Birthday?: string;
}

interface AuthResponse {
    user: User;
    token: string;
}

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
        Birthdate: Date;
    };
    ImagePath: string;
    Featured: boolean;
}

@Injectable({
    providedIn: "root"
})
export class FetchApiDataService {
    constructor(private http: HttpClient) {}

    private getToken(): string {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }
        return token;
    }

    // User registration
    public userRegistration(userDetails: UserDetails): Observable<AuthResponse> {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(userDetails.Email)) {
            return throwError(() => new Error("Invalid email format"));
        }

        // Ensure Username is provided and properly formatted
        if (!userDetails.Username || userDetails.Username.trim().length < 1) {
            return throwError(() => new Error("Username is required"));
        }

        const formattedData = {
            Username: userDetails.Username.trim(),
            Password: userDetails.Password,
            Email: userDetails.Email.toLowerCase(),
            Birthday: userDetails.Birthday
                ? new Date(userDetails.Birthday).toISOString().split("T")[0]
                : undefined
        };

        console.log("Sending formatted data:", formattedData);
        return this.http
            .post<AuthResponse>(apiUrl + "users", formattedData, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            })
            .pipe(
                map((response: AuthResponse): AuthResponse => {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    return response;
                }),
                catchError((error) => {
                    console.error("Registration error:", error);
                    if (error.error && Array.isArray(error.error)) {
                        const messages = error.error.map((e: any) => e.msg).join(", ");
                        return throwError(() => new Error(messages));
                    }
                    return throwError(() => error);
                })
            );
    }

    // User login
    public userLogin(userDetails: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(apiUrl + "login", userDetails).pipe(
            map((response: AuthResponse): AuthResponse => {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                return response;
            }),
            catchError((error) => {
                console.error("Error:", error);
                return throwError(() => error);
            })
        );
    }

    // Get user by username
    getUser(username: string): Observable<User> {
        return this.http
            .get<User>(apiUrl + `users/${username}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Edit user
    editUser(username: string, updatedUser: Partial<User>): Observable<User> {
        return this.http
            .put<User>(apiUrl + `users/${username}`, updatedUser, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Delete user
    deleteUser(username: string): Observable<User> {
        return this.http
            .delete<User>(apiUrl + `users/${username}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Get all movies
    getAllMovies(): Observable<Movie[]> {
        return this.http
            .get<Movie[]>(apiUrl + "movies", {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie[]): Movie[] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Get One movie
    getOneMovie(title: string): Observable<Movie> {
        return this.http
            .get<Movie>(apiUrl + `movies/${title}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie): Movie => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Get director
    getDirector(directorName: string): Observable<Movie["Director"]> {
        return this.http
            .get<Movie["Director"]>(apiUrl + `movies/Director/${directorName}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie["Director"]): Movie["Director"] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Get genre
    getGenre(genreName: string): Observable<Movie["Genre"]> {
        return this.http
            .get<Movie["Genre"]>(apiUrl + `movies/Genre/${genreName}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie["Genre"]): Movie["Genre"] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Get user's favorite movies
    getFavoriteMovies(username: string): Observable<Movie[]> {
        return this.http
            .get<Movie[]>(apiUrl + `users/${username}/movies`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie[]): Movie[] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Add movie to favorites
    addFovoriteMovie(movieId: string): Observable<User> {
        const username = JSON.parse(localStorage.getItem("user") || "{}").Username;
        return this.http
            .post<User>(
                apiUrl + `users/${username}/movies/${movieId}`,
                {},
                {
                    headers: new HttpHeaders({
                        Authorization: "Bearer " + this.getToken()
                    })
                }
            )
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    // Delete from favorites
    deleteFavoriteMovie(movieId: string): Observable<User> {
        const username = JSON.parse(localStorage.getItem("user") || "{}").Username;
        return this.http
            .delete<User>(apiUrl + `users/${username}/movies/${movieId}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }
}
