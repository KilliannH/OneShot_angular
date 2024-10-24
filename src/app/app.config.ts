import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNgIconsConfig } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor])),
  provideNgIconsConfig({
    size: '1em',
  })]
};
