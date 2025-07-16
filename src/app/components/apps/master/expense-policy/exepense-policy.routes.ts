import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const EXPESNES_POLICY_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./expense-policy-list/expense-policy-list.component').then(m => m.ExpensePolicyListComponent), title: 'Expense Policy List', canActivate: [authGuard] }
];
