import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const REFERRAL_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./referral-program-list/referral-program-list.component').then(m => m.ReferralProgramListComponent), title: 'Referral Program List', canActivate: [authGuard] },
];
