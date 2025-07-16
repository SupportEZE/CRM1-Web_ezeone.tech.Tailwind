import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const PURCHASE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./purchase-list/purchase-list.component').then(m => m.PurchaseListComponent), title: 'Purchase List', canActivate: [authGuard]},
  { path: 'purchase-add', loadComponent: () => import('./pruchase-add/purchase-add.component').then(m => m.PurchaseAddComponent), title: 'Purchase Add', canActivate: [authGuard] },
  { path: 'purchase-detail/:id', loadComponent: () => import('./purchase-detail/purchase-detail.component').then(m => m.PurchaseDetailComponent), title: 'Purchase Detail', canActivate: [authGuard]},
];


