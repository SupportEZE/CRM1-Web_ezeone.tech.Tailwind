import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const USER_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent), title: 'User List', canActivate: [authGuard] },
    { path: 'user-add/:login_type_id', loadComponent: () => import('./user-add/user-add.component').then(m => m.UserAddComponent), title: 'User Add', canActivate: [authGuard] },
    { path: 'user-detail/:id', loadComponent: () => import('./user-detail/user-detail.component').then(m => m.UserDetailComponent), title: 'User Detail', canActivate: [authGuard] },
    { path: 'user-detail/:id/:edit', loadComponent: () => import('./user-add/user-add.component').then(m => m.UserAddComponent), title: 'User Edit', canActivate: [authGuard] },
];
