/**
 * Movie Details Dialog Component
 * @file movie-details-dialog.component.ts
 * @description Dialog component for displaying detailed movie information
 */
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

/**
 * Movie Details Dialog Component
 * @class MovieDetailsDialogComponent
 * @description Displays movie details in a Material dialog
 */
@Component({
    selector: "app-movie-details-dialog",
    imports: [MatCardModule, MatDialogModule],
    templateUrl: "./movie-details-dialog.component.html",
    styleUrl: "./movie-details-dialog.component.scss"
})
export class MovieDetailsDialogComponent implements OnInit {
    /**
     * Creates an instance of MovieDetailsDialogComponent
     * @constructor
     * @param dialogRef - Reference to the dialog
     * @param data - Data passed to the dialog
     */
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
