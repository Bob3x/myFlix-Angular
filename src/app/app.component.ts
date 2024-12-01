import { Component } from "@angular/core";
import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { UserLoginFormComponent } from "./user-login-form/user-login-form.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, MatButtonModule, MatDialogModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    title = "myFlix-Angular-client";

    constructor(public dialog: MatDialog) {}

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

    openMoviesDialog(): void {
        this.dialog.open(MovieCardComponent, {
            width: "100%",
            maxWidth: "960px",
            height: "88vh",
            panelClass: "movies-dialog",
            autoFocus: false
        });
    }
}
