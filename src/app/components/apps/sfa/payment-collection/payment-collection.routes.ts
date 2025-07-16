import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const PAYMENT_COLLECTION_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./payment-collection-list/payment-collection-list.component').then(m => m.PaymentCollectionListComponent), title: 'Payment Collection List', canActivate: [authGuard] },
    { path: 'payment-collection-detail/:id', loadComponent: () => import('./payment-collection-detail/payment-collection-detail.component').then(m => m.PaymentCollectionDetailComponent), title: 'Payment Collection Detail', canActivate: [authGuard] },
];
