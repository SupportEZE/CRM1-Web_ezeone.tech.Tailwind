import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const SERVICE_INVOICE_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./service-invoice-list/service-invoice-list.component').then(m => m.ServiceInvoiceListComponent), title: 'Service Invoice List', canActivate: [authGuard]  },
    { path: 'invoice-detail/:id', loadComponent: () => import('./service-invoice-detail/service-invoice-detail.component').then(m => m.ServiceInvoiceDetailComponent), title: 'Service Invoice Detail', canActivate: [authGuard]  },
    { path: 'invoice-add', loadComponent: () => import('./service-invoice-add/service-invoice-add.component').then(m => m.ServiceInvoiceAddComponent), title: 'Service Invoice Add', canActivate: [authGuard]  },
];
