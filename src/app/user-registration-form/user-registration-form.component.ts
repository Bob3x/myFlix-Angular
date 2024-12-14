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
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";

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
    imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
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
    isLoading = false;

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
        private dialog: MatDialog,
        private router: Router
    ) {}

    /** Lifecycle hook for component initialization */
    ngOnInit(): void {}

    registerUser(): void {
        this.isLoading = true;
        this.fetchApiData.userRegistration(this.userData).subscribe({
            next: (response) => {
                console.log("Registration successful:", response);
                // Logic for a successful user registration goes here! (To be implemented)
                this.isLoading = false;
                this.snackBar.open("User successfully registered!", "OK", {
                    duration: 2000
                });

                // Close the dialog
                this.dialogRef.close();
                this.dialog.open(UserLoginFormComponent, {
                    width: "50%"
                });
            },
            error: (error) => {
                this.isLoading = false;
                this.snackBar.open(error.message, "OK", {
                    duration: 2000
                });
            }
        });
    }
}
