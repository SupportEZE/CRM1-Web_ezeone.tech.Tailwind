import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const SITE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./site-list/site-list.component').then(m => m.SiteListComponent), title: 'Site List', canActivate: [authGuard] },
    { path: 'site-add', loadComponent: () => import('./site-add/site-add.component').then(m => m.SiteAddComponent), title: 'Site Add', canActivate: [authGuard] },
    { path: 'site-detail/:id', loadComponent: () => import('./site-detail/site-detail.component').then(m => m.SiteDetailComponent), title: 'Site Detail', canActivate: [authGuard] },
    { path: 'site-detail/:id/:edit', loadComponent: () => import('./site-add/site-add.component').then(m => m.SiteAddComponent), title: 'Site Edit', canActivate: [authGuard] },
];
