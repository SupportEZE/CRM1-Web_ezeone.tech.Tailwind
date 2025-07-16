import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const SERVICE_ATTENDANCE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./service-attendance-list/service-attendance-list.component').then(m => m.ServiceAttendanceListComponent), title: 'Service Attendance List', canActivate: [authGuard] },
];
