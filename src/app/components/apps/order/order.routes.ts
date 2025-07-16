


import { Routes } from '@angular/router';
import { authGuard } from '../../../core/auth/auth.guard';
import { PRIMARY_ORDER_ROUTES } from './primary-order/primary-order.routes';
import { SECONDARY_ORDER_ROUTES } from './secondary-order/secondary-order.routes';

export const ORDER_ROUTES: Routes = [
    {path: 'primary-order', children: PRIMARY_ORDER_ROUTES, canActivate: [authGuard]},
    { path: 'secondary-order', children: SECONDARY_ORDER_ROUTES, canActivate: [authGuard] },
    
]

