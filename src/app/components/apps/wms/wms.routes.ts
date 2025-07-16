import { Routes } from '@angular/router';
import { DISPATCH_ROUTES } from './dispatch/dispatch.routes';
import { authGuard } from '../../../core/auth/auth.guard';

export const WMS_ROUTES: Routes = [
    { path: 'dispatch-list/:type', children: DISPATCH_ROUTES, canActivate: [authGuard] },
];
