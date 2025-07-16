import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const GIFT_ROUTES: Routes =[
    { path: '', loadComponent: () => import('./gift-list/gift-list.component').then(m => m.GiftListComponent), title: 'Gift Gallery', canActivate: [authGuard]},
    { path: 'gift-add', loadComponent: () => import('./gift-add/gift-add.component').then(m => m.GiftAddComponent), title: 'Gift Add', canActivate: [authGuard]},
    { path: 'gift-detail/:type/:id', loadComponent: () => import('./gift-detail/gift-detail.component').then(m => m.GiftDetailComponent), title: 'Gift Detail', canActivate: [authGuard]},
]
