/**
 * Server-side routing configuration for Angular SSR
 * @file app.routes.server.ts
 * @description Defines server-side rendering behavior for routes
 */
import { RenderMode, ServerRoute } from "@angular/ssr";
/**
 * Server-side routes configuration array
 * @constant serverRoutes
 * @type {ServerRoute[]}
 * @description Configures how routes are handled during server-side rendering
 */
export const serverRoutes: ServerRoute[] = [
    /**
     * Wildcard route configuration
     * @path ** - Matches all routes
     * @renderMode Prerender - Static generation of routes at build time
     * @description Configures prerendering for all application routes
     */
    {
        path: "**",
        renderMode: RenderMode.Prerender
    }
];
