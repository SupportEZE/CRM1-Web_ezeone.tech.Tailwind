import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const SERVICE_CHECKIN_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./service-checkin-list/service-checkin-list.component').then(m => m.ServiceCheckinListComponent), title: 'Service CheckIn List', canActivate: [authGuard] },
];
