import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-movie-details-dialog",
    imports: [MatCardModule, MatDialogModule],
    templateUrl: "./movie-details-dialog.component.html",
    styleUrl: "./movie-details-dialog.component.scss"
})
export class MovieDetailsDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            title: string;
            content: string;
        },
        public dialogRef: MatDialogRef<MovieDetailsDialogComponent>
    ) {}

    ngOnInit(): void {}

    closeDetailsDialog(): void {
        this.dialogRef.close();
    }
}
