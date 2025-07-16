import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const LEAVE_MASTER_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./leave-list/leave-list.component').then(m => m.LeaveListComponent), title: 'Leave List', canActivate: [authGuard] },
    { path: 'leave/leave-modal', loadComponent: () => import('./leave-modal/leave-modal.component').then(m => m.LeaveModalComponent), title: 'Leave List', canActivate: [authGuard] },
];
