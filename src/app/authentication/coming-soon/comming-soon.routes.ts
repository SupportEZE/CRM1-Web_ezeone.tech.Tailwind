import { Routes } from '@angular/router';

export const COMMING_SOON_ROUTES: Routes = [
  
  { path: '', loadComponent: () => import('./coming-soon.component').then(m => m.ComingSoonComponent), title: 'Comming Soon' },
  
];
