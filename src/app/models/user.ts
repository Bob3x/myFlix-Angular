// src/app/models/user.ts
export interface User {
    _id: string;
    Username: string;
    Password: string;
    Email: string;
    Birthday: Date;
    FavoriteMovies: string[];
}

// Optional: Add more specific types
export interface UserResponse extends Omit<User, "Password"> {
    token: string;
}

export interface UserLogin {
    Username: string;
    Password: string;
}

export interface UserRegistration extends UserLogin {
    Email: string;
    Birthday?: string;
}
