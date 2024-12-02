import { Component, OnInit } from "@angular/core";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-welcome-page",
    imports: [MatButtonModule],
    templateUrl: "./welcome-page.component.html",
    styleUrl: "./welcome-page.component.scss"
})
export class WelcomePageComponent implements OnInit {
    constructor(public dialog: MatDialog) {}
    ngOnInit(): void {}

    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            width: "520px"
        });
    }

    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent, {
            width: "520px"
        });
    }
}
