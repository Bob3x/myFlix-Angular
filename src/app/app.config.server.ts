/**
 * Server-side application configuration
 * @file app.config.server.ts
 * @description Configures Angular server-side rendering and related providers
 */
import { mergeApplicationConfig, ApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideServerRoutesConfig } from "@angular/ssr";
import { appConfig } from "./app.config";
import { serverRoutes } from "./app.routes.server";

/**
 * Server-specific configuration object
 * @constant serverConfig
 * @type {ApplicationConfig}
 * @description Defines server-side providers and SSR configuration
 */
const serverConfig: ApplicationConfig = {
    providers: [
        /**
         * Server rendering provider
         * @provider provideServerRendering
         * @description Enables Angular Universal server-side rendering capabilities
         */
        provideServerRendering(),
        /**
         * Server routes configuration provider
         * @provider provideServerRoutesConfig
         * @description Configures server-side routing using defined server routes
         */
        provideServerRoutesConfig(serverRoutes)
    ]
};

/**
 * Merged application configuration
 * @constant config
 * @description Combines browser and server configurations for SSR
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
