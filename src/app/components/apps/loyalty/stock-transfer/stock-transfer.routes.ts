import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const STOCK_TRANSFER_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./company-stock-transfer-list/company-stock-transfer-list.component').then(m => m.CompanyStockTransferListComponent), title: 'Stock Transfer', canActivate: [authGuard]},
  { path: 'stock-transfer-detail/:id', loadComponent: () => import('./stock-transfer-detail/stock-transfer-detail.component').then(m => m.StockTransferDetailComponent), title: 'Company to Customer Stock Transfer Detail', canActivate: [authGuard]},
  { path: 'customer-stock-transfer-detail/:id', loadComponent: () => import('./customer-stock-transfer-detail/customer-stock-transfer-detail.component').then(m => m.CustomerStockTransferDetailComponent), title: 'Customer to Customer Stock Transfer Detail', canActivate: [authGuard] },
  { path: 'stock-add', loadComponent: () => import('./stock-transfer-add/stock-transfer-add.component').then(m => m.StockTransferAddComponent), title: 'Stock Transfer Add', canActivate: [authGuard] },
  { path: 'customer-stock-return-list', loadComponent: () => import('././stock-return/customer-stock-return-list/customer-stock-return-list.component').then(m => m.CustomerStockReturnListComponent), title: 'Stock Return', canActivate: [authGuard] },
  { path: 'company-stock-return-list', loadComponent: () => import('././stock-return/stock-return-list/stock-return-list.component').then(m => m.StockReturnListComponent), title: 'Stock Return', canActivate: [authGuard] },
  { path: 'stock-return-add', loadComponent: () => import('././stock-return/stock-return-add/stock-return-add.component').then(m => m.StockReturnAddComponent), title: 'Stock Return', canActivate: [authGuard] },
  { path: 'stock-return-detail/:id', loadComponent: () => import('././stock-return/stock-return-detail/stock-return-detail.component').then(m => m.StockReturnDetailComponent), title: 'Stock Return', canActivate: [authGuard] },
];


