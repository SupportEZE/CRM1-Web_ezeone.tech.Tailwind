import { Routes } from '@angular/router';
import { authGuard } from '../../../../../core/auth/auth.guard';

export const STOCK_AUDIT_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./stock-audit-list/stock-audit-list.component').then(m => m.StockAuditListComponent), title: 'Stock Audit List', canActivate: [authGuard] },
];
