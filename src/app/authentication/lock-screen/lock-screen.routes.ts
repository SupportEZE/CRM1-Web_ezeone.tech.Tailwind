import { Routes } from '@angular/router';

export const LOCK_SCREEN_ROUTES: Routes = [
  
  { path: '', loadComponent: () => import('./cover/cover.component').then(m => m.CoverComponent), title: 'Lock Screen' },
  { path: 'basic-lock-screen', loadComponent: () => import('./basic/basic.component').then(m => m.BasicComponent), title: 'Lock Screen' },
  
];
