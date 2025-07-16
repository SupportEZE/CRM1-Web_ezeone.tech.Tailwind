import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const TARGET_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./target-list/target-list.component').then(m => m.TargetListComponent), title: 'Target List', canActivate: [authGuard] },
    { path: 'target-add', loadComponent: () => import('./target-add/target-add.component').then(m => m.TargetAddComponent), title: 'Target Add', canActivate: [authGuard] },
    { path: 'target-detail/:id', loadComponent: () => import('./target-detail/target-detail.component').then(m => m.TargetDetailComponent), title: 'Target Detail', canActivate: [authGuard] },
    { path: 'target-detail/:id/:edit', loadComponent: () => import('./target-add/target-add.component').then(m => m.TargetAddComponent), title: 'Target Detail Edit', canActivate: [authGuard] },
];
