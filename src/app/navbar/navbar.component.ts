import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBar } from "@angular/material/snack-bar";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss"
})
export class NavbarComponent {
    constructor(
        private snackBar: MatSnackBar,
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router
    ) {}

    isMoviesRoute(): boolean {
        return this.router.url === "/movies";
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            //Clear all stored data
            localStorage.clear();

            // Show logout message
            this.snackBar.open("Logut successful!", "OK", {
                duration: 2000
            });

            // Navigate to welcome page
            this.router.navigate(["welcome"]);
        }
    }
}
