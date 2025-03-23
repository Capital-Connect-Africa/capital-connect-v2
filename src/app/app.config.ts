import { routes } from './app.routes';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { HttpErrorInterceptor } from './core/interceptors/http.error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    MessageService, ConfirmationService,
    provideHttpClient(withInterceptors([AuthInterceptor, HttpErrorInterceptor])),
    providePrimeNG({
        ripple: true,
        theme: {
            preset: Lara,
            options: {
                prefix: 'p',
                darkModeSelector: 'light',
                cssLayer: {
                    name: 'primeng',
                    order: 'tailwind-base, primeng, tailwind-utilities',
                },
            },
        },
    }),
],
};
