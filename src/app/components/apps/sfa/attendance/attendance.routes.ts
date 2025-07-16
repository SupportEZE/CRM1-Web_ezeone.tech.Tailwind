import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const ATTENDANCE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./attendance-list/attendance-list.component').then(m => m.AttendanceListComponent), title: 'Attendance List', canActivate: [authGuard] },
    { path: 'attendance-detail/:id', loadComponent: () => import('./attendance-detail/attendance-detail.component').then(m => m.AttendanceDetailComponent), title: 'Attendance Detail', canActivate: [authGuard] },
];
