import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const QR_ROUTES: Routes =[
    { path: '', loadComponent: () => import('./qr-list/qr-list.component').then(m => m.QrListComponent), title: 'Qr List', canActivate: [authGuard] },
    { path: 'qr-add', loadComponent: () => import('./qr-add/qr-add.component').then(m => m.QrAddComponent), title: 'Qr Code', canActivate: [authGuard] },
    { path: 'qr-details/:id', loadComponent: () => import('./qr-details/qr-details.component').then(m => m.QrDetailsComponent), title: 'Qr Details', canActivate: [authGuard] },
]
