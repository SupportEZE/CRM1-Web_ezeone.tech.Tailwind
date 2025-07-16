import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { FlatpickrModule } from 'angularx-flatpickr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { DataService } from './shared/data/select';
import { provideAuth, getAuth } from '@angular/fire/auth';

// ✅ Firebase (modular) imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
  providers: [
    DataService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    RouterOutlet,
    BrowserModule,
    provideAuth(() => getAuth()),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideMessaging(() => getMessaging()),

    importProvidersFrom(
      FlatpickrModule.forRoot(),
      BrowserAnimationsModule,
      ColorPickerModule,
      ToastrModule.forRoot({
        timeOut: 15000,
        closeButton: true,
        progressBar: true,
      })
    )
  ]
};
