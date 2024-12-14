/**
 * Root application component
 * @file app.component.ts
 * @description Main application component that serves as the entry point
 */
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

/**
 * Root component configuration
 * @class AppComponent
 * @description Primary component that bootstraps the application
 * @decorator Component
 */
@Component({
    /**
     * Component selector for use in templates
     * @property selector
     * @type {string}
     */
    selector: "app-root",
    /**
     * Marks component as standalone
     * @property standalone
     * @type {boolean}
     */
    standalone: true,
    /**
     * Required module imports
     * @property imports
     * @type {Array}
     */
    imports: [RouterModule, MatProgressSpinnerModule],
    /**
     * Path to component's HTML template
     * @property templateUrl
     * @type {string}
     */
    templateUrl: "./app.component.html",
    /**
     * Path to component's SCSS styles
     * @property styleUrl
     * @type {string}
     */
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    /**
     * Application title
     * @property title
     * @type {string}
     */

    title: string = "myFlix-Angular-client";
}
