import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MASTER_ROUTES } from './master/master.routes';
import { LOYALTY_ROUTES } from './loyalty/loyalty.routes';
import { INDEPENDENT_ROUTES } from './independent-components/independent-components.routes';
import { SUPPORT_ROUTES } from './support/support.routes';
import { SFA_ROUTES } from './sfa/sfa.routes';
import { CUSTOMER_ROUTES } from './customer/customer.routes';
import { AUTHENTICATION_ROUTES } from '../../authentication/authentication.route';
import { SERVICE_ROUTES } from './service/service.routes';
import { WMS_ROUTES } from './wms/wms.routes';
import { authGuard } from '../../core/auth/auth.guard';
import { ORDER_ROUTES } from './order/order.routes';

export const admin: Routes = [
    {
        path: 'apps',
        children: [
            { path: 'master', children: MASTER_ROUTES, canActivate: [authGuard] },
            // { path: 'customer', children: CUSTOMER_ROUTES },
            { path: 'loyalty', children: LOYALTY_ROUTES, canActivate: [authGuard] },
            { path: 'customer', children: CUSTOMER_ROUTES, canActivate: [authGuard] },
            { path: 'order', children: ORDER_ROUTES, canActivate: [authGuard] },
            { path: 'sfa', children: SFA_ROUTES, canActivate: [authGuard] },
            { path: 'wms', children: WMS_ROUTES, canActivate: [authGuard] },
            { path: 'service', children: SERVICE_ROUTES, canActivate: [authGuard] },
            { path: 'support', children: SUPPORT_ROUTES, canActivate: [authGuard] },
            { path: 'independent', children: INDEPENDENT_ROUTES, canActivate: [authGuard] },
            { path: 'authentication', children: AUTHENTICATION_ROUTES, canActivate: [authGuard] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(admin)],
    exports: [RouterModule],
})
export class appsRoutingModule {
    static routes = admin;
}