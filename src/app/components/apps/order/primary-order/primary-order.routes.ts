import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const PRIMARY_ORDER_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./primary-order-list/primary-order-list.component').then(m => m.PrimaryOrderListComponent), title: 'Primary Order List', canActivate: [authGuard] },
    { path: 'primary-order-add', loadComponent: () => import('./primary-order-add/primary-order-add.component').then(m => m.PrimaryOrderAddComponent), title: 'Primary Order Add',  canActivate: [authGuard]},
    { path: 'primary-order-detail/:id', loadComponent: () => import('./primary-order-detail/primary-order-detail.component').then(m => m.PrimaryOrderDetailComponent), title: 'Primary Order Detail',  canActivate: [authGuard]},
];
