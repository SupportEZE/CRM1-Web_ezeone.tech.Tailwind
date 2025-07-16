import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const SCHEME_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./scheme-list/scheme-list.component').then(m => m.SchemeListComponent), title: 'Scheme List', canActivate: [authGuard] },
    { path: 'scheme-add', loadComponent: () => import('./scheme-add/scheme-add.component').then(m => m.SchemeAddComponent), title: 'Scheme Add', canActivate: [authGuard] },
    { path: 'scheme-detail/:id', loadComponent: () => import('./scheme-detail/scheme-detail.component').then(m => m.SchemeDetailComponent), title: 'Scheme Detail', canActivate: [authGuard] },
];
