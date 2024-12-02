/**
 * Application configuration module
 * @file app.config.ts
 * @description Configures core Angular services and providers for the application
 */
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { routes } from "./app.routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";

/**
 * Application configuration object
 * @constant appConfig
 * @type {ApplicationConfig}
 * @description Defines core providers and configuration for the Angular application
 */
export const appConfig: ApplicationConfig = {
    providers: [
        /**
         * Zone.js change detection configuration
         * @provider provideZoneChangeDetection
         * @description Configures change detection with event coalescing for better performance
         */
        provideZoneChangeDetection({ eventCoalescing: true }),
        /**
         * Router configuration
         * @provider provideRouter
         * @description Configures application routing using defined routes
         */
        provideRouter(routes),
        /**
         * Client hydration configuration
         * @provider provideClientHydration
         * @description Enables SSR hydration with event replay support
         */
        provideClientHydration(withEventReplay()),
        /**
         * HTTP client configuration
         * @provider provideHttpClient
         * @description Configures HTTP client with fetch API support
         */
        provideHttpClient(withFetch()),
        /**
         * Animation support
         * @provider provideAnimations
         * @description Enables Angular animations functionality
         */
        provideAnimations(),
        /**
         * Forms module configuration
         * @provider FormsModule
         * @description Enables template-driven forms functionality
         */
        FormsModule
    ]
};
