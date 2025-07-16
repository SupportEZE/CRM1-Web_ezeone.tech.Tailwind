import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const REDEEM_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./redeem-list/redeem-list.component').then(m => m.RedeemListComponent), title: 'Redeem List', canActivate: [authGuard] },
];
