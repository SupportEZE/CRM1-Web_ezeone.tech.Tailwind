import { Routes } from '@angular/router';
import { authGuard } from '../../../../../core/auth/auth.guard';

export const BONUS_ROUTES: Routes =[
    { path: '', loadComponent: () => import('./bonus-point-list/bonus-point-list.component').then(m => m.BonusPointListComponent), title: 'Bonus Point List', canActivate: [authGuard] },
    { path: 'bonus-add', loadComponent: () => import('./bonus-point-add/bonus-point-add.component').then(m => m.BonusPointAddComponent), title: 'Bonus Point Add', canActivate: [authGuard] },
    { path: 'detail/:id', loadComponent: () => import('./bonus-point-detail/bonus-point-detail.component').then(m => m.BonusPointDetailComponent), title: 'Bonus Point Detail', canActivate: [authGuard] },
    { path: 'bonus-point-detail/:id/:edit', loadComponent: () => import('./bonus-point-detail/bonus-point-detail.component').then(m => m.BonusPointDetailComponent), title: 'Bonus Point Detail', canActivate: [authGuard] },
]
