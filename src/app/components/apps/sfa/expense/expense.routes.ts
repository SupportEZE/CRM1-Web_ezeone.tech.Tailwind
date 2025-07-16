import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const EXPENSE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./expense-list/expense-list.component').then(m => m.ExpenseListComponent), title: 'Expense List' , canActivate: [authGuard]},
    { path: 'expense-add', loadComponent: () => import('./expense-add/expense-add.component').then(m => m.ExpenseAddComponent), title: 'Expense Add' , canActivate: [authGuard]},
    { path: 'expense-detail/:id', loadComponent: () => import('./expense-detail/expense-detail.component').then(m => m.ExpenseDetailComponent), title: 'Expense Detail' , canActivate: [authGuard]},
];
