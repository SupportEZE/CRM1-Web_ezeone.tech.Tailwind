import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const POP_GIFT_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./pop-gift-list/pop-gift-list.component').then(m => m.PopGiftListComponent), title: 'Pop & Gift List', canActivate: [authGuard] },
    { path: 'pop-gift-add', loadComponent: () => import('./pop-gift-add/pop-gift-add.component').then(m => m.PopGiftAddComponent), title: 'Pop & Gift Add', canActivate: [authGuard] },
    { path: 'pop-gift-detail/:id/:activeTab', loadComponent: () => import('./pop-gift-detail/pop-gift-detail.component').then(m => m.PopGiftDetailComponent), title: 'Pop & Gift Detail', canActivate: [authGuard] },
];
