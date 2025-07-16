import { Routes } from '@angular/router';

export const CALL_REQUEST_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./call-request/call-request.component').then(m => m.CallRequestComponent), title: 'Call Request' },
];
