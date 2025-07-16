import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const FOLLOWUP_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./follow-up-list/follow-up-list.component').then(m => m.FollowUpListComponent), title: 'Follow Up List' , canActivate: [authGuard]},
    { path: 'follow-up-add', loadComponent: () => import('./follow-up-add/follow-up-add.component').then(m => m.FollowUpAddComponent), title: 'Follow Up Add' , canActivate: [authGuard]},
];
