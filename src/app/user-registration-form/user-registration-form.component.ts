import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FetchApiDataService } from "../services/fetch-api-data.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-user-registration-form",
    imports: [FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule],
    standalone: true,
    templateUrl: "./user-registration-form.component.html",
    styleUrl: "./user-registration-form.component.scss"
})
export class UserRegistrationFormComponent implements OnInit {
    userData = {
        Username: "",
        Password: "",
        Email: "",
        Birthday: ""
    };

    constructor(
        private fetchApiData: FetchApiDataService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<UserRegistrationFormComponent>
    ) {}

    ngOnInit(): void {}

    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe({
            next: (response) => {
                this.dialogRef.close();
                console.log(response);
                this.snackBar.open("User registered successfully!", "OK", {
                    duration: 2000
                });
            },
            error: (error) => {
                console.log(error);
                this.snackBar.open(error, "OK", {
                    duration: 2000
                });
            }
        });
    }
}
