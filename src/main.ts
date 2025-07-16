import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Register the service worker before bootstrapping the app
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('firebase-messaging-sw.js')
//     .then(reg => console.log('Service Worker registered:', reg))
//     .catch(err => console.error('Service Worker registration failed:', err));
// }

// Now bootstrap the application
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
