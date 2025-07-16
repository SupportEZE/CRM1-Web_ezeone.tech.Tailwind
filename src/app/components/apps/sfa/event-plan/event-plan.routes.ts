import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const EVENT_PLAN_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./event-plan-list/event-plan-list.component').then(m => m.EventPlanListComponent), title: 'Event Plan List', canActivate: [authGuard] },
    { path: 'event-plan-detail/:id', loadComponent: () => import('./event-plan-detail/event-plan-detail.component').then(m => m.EventPlanDetailComponent), title: 'Event Plan Detail', canActivate: [authGuard] },
    { path: 'event-plan-add', loadComponent: () => import('./event-plan-add/event-plan-add.component').then(m => m.EventPlanAddComponent), title: 'Event Plan Add', canActivate: [authGuard] },
];