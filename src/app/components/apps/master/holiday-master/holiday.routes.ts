import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const HOLIDAY_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./holiday-list/holiday-list.component').then(m => m.HolidayListComponent), title: 'Holiday List', canActivate: [authGuard] },
];
