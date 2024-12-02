/**
 * Welcome page component
 * @file welcome-page.component.ts
 * @description Landing page component that handles user registration and login
 */
import { Component, OnInit } from "@angular/core";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

/**
 * Welcome page component configuration
 * @class WelcomePageComponent
 * @description Provides user authentication options through Material dialogs
 */
@Component({
    selector: "app-welcome-page",
    imports: [MatButtonModule],
    templateUrl: "./welcome-page.component.html",
    styleUrl: "./welcome-page.component.scss"
})
export class WelcomePageComponent implements OnInit {
    /**
     * Creates an instance of WelcomePageComponent
     * @constructor
     * @param dialog - Material Dialog service for opening registration and login forms
     */
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    /**
     * Opens the user registration dialog
     * @method openUserRegistrationDialog
     * @description Displays registration form in a Material dialog
     */
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: "520px"
        });
    }

    /**
     * Opens the user login dialog
     * @method openUserLoginDialog
     * @description Displays login form in a Material dialog
     */
    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent, {
            width: "520px"
        });
    }
}
