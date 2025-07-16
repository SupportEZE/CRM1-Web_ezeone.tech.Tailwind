import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const BEAT_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./beat-list/beat-list.component').then(m => m.BeatListComponent), title: 'Beat Plan', canActivate: [authGuard] },
    { path: 'beat-add', loadComponent: () => import('./beat-add/beat-add.component').then(m => m.BeatAddComponent), title: 'Beat Add', canActivate: [authGuard] },
];
