/**
 * User Login Form Component
 * @file user-login-form.component.ts
 * @description Handles user authentication through login form
 */
import { Component, OnInit, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule, Router } from "@angular/router";
import { FetchApiDataService } from "../services/fetch-api-data.service";

/**
 * User Login Form Component
 * @class UserLoginFormComponent
 * @implements OnInit
 * @description Provides form interface for user authentication
 */
@Component({
    selector: "app-user-login-form",
    standalone: true,
    imports: [
        CommonModule, // Add CommonModule
        FormsModule, // Change to NgForm
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule
    ],
    templateUrl: "./user-login-form.component.html",
    styleUrl: "./user-login-form.component.scss"
})
export class UserLoginFormComponent implements OnInit {
    /**
     * Login form data
     * @property userData
     * @type {Object}
     * @description Stores username and password for authentication
     */
    userData = {
        Username: "",
        Password: ""
    };

    /**
     * Creates an instance of UserLoginFormComponent
     * @constructor
     * @param fetchApiData - Service for API calls
     * @param dialogRef - Reference to the dialog containing this form
     * @param snackBar - Service for showing notifications
     * @param router - Angular router service
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router
    ) {}

    /** Lifecycle hook for component initialization */
    ngOnInit(): void {}

    /**
     * Handles user login
     * @method logInUser
     * @description Authenticates user and stores session data
     */
    logInUser(): void {
        console.log("Login attempt width userData:", this.userData);
        this.fetchApiData.userLogin(this.userData).subscribe({
            next: (res: any) => {
                console.log("Login response:", res);

                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("token", res.token);

                this.dialogRef.close();

                this.snackBar.open(`Login successful, Welcome ${res.user.Username}`, "OK", {
                    duration: 2000
                });
                this.router.navigate(["movies"]);
                let user = {
                    ...res.user,
                    id: res.user._id,
                    Password: this.userData.Password,
                    token: res.token
                };
            },
            error: (error) => {
                console.error("Login error:", error);
                this.snackBar.open(error.message || "Login failed: ", "OK", {
                    duration: 2000
                });
            }
        });
    }
}
