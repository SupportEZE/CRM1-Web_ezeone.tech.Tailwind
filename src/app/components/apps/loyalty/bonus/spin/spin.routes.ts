import { Routes } from '@angular/router';
import { authGuard } from '../../../../../core/auth/auth.guard';

export const SPIN_ROUTES: Routes =[  
    { path: '', loadComponent: () => import('./spin-win-list/spin-win-list.component').then(m => m.SpinWinListComponent), title: 'Spin & Win', canActivate: [authGuard] },
    { path: 'spin-win-add', loadComponent: () => import('./spin-win-add/spin-win-add.component').then(m => m.SpinWinAddComponent), title: 'Spin Win Add', canActivate: [authGuard] },
    { path: 'edit/:id/:edit', loadComponent: () => import('./spin-win-add/spin-win-add.component').then(m => m.SpinWinAddComponent), title: 'Spin Win Edit', canActivate: [authGuard] }
]
