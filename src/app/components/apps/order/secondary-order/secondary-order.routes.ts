import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const SECONDARY_ORDER_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./secondary-order-list/secondary-order-list.component').then(m => m.SecondaryOrderListComponent), title: 'Secondary Order List', canActivate: [authGuard] },
    { path: 'secondary-order-add', loadComponent: () => import('./secondary-order-add/secondary-order-add.component').then(m => m.SecondaryOrderAddComponent), title: 'Secondary Order Add',  canActivate: [authGuard]},
    { path: 'secondary-order-detail/:id', loadComponent: () => import('./secondary-order-detail/secondary-order-detail.component').then(m => m.SecondaryOrderDetailComponent), title: 'Secondary Order Detail',  canActivate: [authGuard]},
];
