import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const BRANDING_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./branding-list/branding-list.component').then(m => m.BrandingListComponent), title: 'Branding List', canActivate: [authGuard] },
    { path: 'branding-add', loadComponent: () => import('./branding-add/branding-add.component').then(m => m.BrandingAddComponent), title: 'Branding Add', canActivate: [authGuard] },
    { path: 'audit-add', loadComponent: () => import('./audit-add/audit-add.component').then(m => m.AuditAddComponent), title: 'Audit Add', canActivate: [authGuard] },
    { path: 'branding-detail/:id', loadComponent: () => import('./branding-detail/branding-detail.component').then(m => m.BrandingDetailComponent), title: 'Branding Detail', canActivate: [authGuard] },
    { path: 'audit-detail/:id', loadComponent: () => import('./audit-detail/audit-detail.component').then(m => m.AuditDetailComponent), title: 'Audit Detail', canActivate: [authGuard] },
];