import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const CHECKIN_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./checkin-list/checkin-list.component').then(m => m.CheckinListComponent), title: 'Checkin List', canActivate: [authGuard] },
];
