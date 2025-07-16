import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const ROLE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./role-and-permission-list.component').then(m => m.RoleAndPermissionListComponent), title: 'Role & Permission', canActivate: [authGuard] },
];
