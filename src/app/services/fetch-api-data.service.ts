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
    Email?: string;
    Birthday?: Date;
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
    public userRegistration(userDetails: any): Observable<AuthResponse> {
        console.log(userDetails);
        return this.http.post<AuthResponse>(apiUrl + "users", userDetails).pipe(
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
            .get<Movie["Director"]>(apiUrl + `director/${directorName}`, {
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
            .get<Movie["Genre"]>(apiUrl + `genres/${genreName}`, {
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
