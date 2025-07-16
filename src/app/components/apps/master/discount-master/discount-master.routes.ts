import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const DISCOUNT_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./discount-master-list/discount-master-list.component').then(m => m.DiscountMasterListComponent), title: 'Discount Master List', canActivate: [authGuard] }
];
