import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const LEAVE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./leave-list/leave-list.component').then(m => m.LeaveListComponent), title: 'Leave' , canActivate: [authGuard]},
    { path: 'leave-add', loadComponent: () => import('./leave-add/leave-add.component').then(m => m.LeaveAddComponent), title: 'Leave Add' , canActivate: [authGuard]},
    { path: 'leave-detail/:id', loadComponent: () => import('./leave-detail/leave-detail.component').then(m => m.LeaveDetailComponent), title: 'Leave Detail' , canActivate: [authGuard]},
];
