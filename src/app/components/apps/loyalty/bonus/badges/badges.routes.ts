import { Routes } from '@angular/router';
import { authGuard } from '../../../../../core/auth/auth.guard';


export const BADGES_ROUTES: Routes =[
    { path: '', loadComponent: () => import('./badges-list/badges-list.component').then(m => m.BadgesListComponent), title: 'Badges List', canActivate: [authGuard] },
    { path: 'badges-add', loadComponent: () => import('./badges-add/badges-add.component').then(m => m.BadgesAddComponent), title: 'Badges Add', canActivate: [authGuard] },
]
