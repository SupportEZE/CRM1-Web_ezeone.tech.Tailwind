import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const DISPATCH_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./dispatch-list/dispatch-list.component').then(m => m.DispatchListComponent), title: 'Dispatch List', canActivate: [authGuard] },
    { path: 'dispatch-detail/:id', loadComponent: () => import('./dispatch-detail/dispatch-detail.component').then(m => m.DispatchDetailComponent), title: 'Dispatch Detail', canActivate: [authGuard] },
    { path: 'list/:type', loadComponent: () => import('./gatepass-list/gatepass-list.component').then(m => m.GatepassListComponent), title: 'Gatepass List', canActivate: [authGuard] },
    { path: 'list/:type/detail/:id', loadComponent: () => import('./gatepass-detail/gatepass-detail.component').then(m => m.GatepassDetailComponent), title: 'Gatepass Detail', canActivate: [authGuard] },
];
