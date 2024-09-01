import { ApplicationConfig, EnvironmentProviders, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

const environmentProviders: EnvironmentProviders[] = [
  provideHttpClient(),
  importProvidersFrom([
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ]),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
];

export const appConfig: ApplicationConfig = {
  providers: environmentProviders
};
