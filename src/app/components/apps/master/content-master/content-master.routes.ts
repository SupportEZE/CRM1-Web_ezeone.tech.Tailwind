import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const CONTENT_MASTER_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./content-master-list/content-master-list.component').then(m => m.ContentMasterListComponent), canActivate: [authGuard], title: 'Content Master' },
];
