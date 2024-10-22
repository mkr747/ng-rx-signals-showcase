import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCartGlobalStore, provideLogGlobalStore, provideProductGlobalStore } from '@showcase/core-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideLogGlobalStore(),
    provideCartGlobalStore(),
    provideProductGlobalStore(), provideAnimationsAsync()
  ],
};
