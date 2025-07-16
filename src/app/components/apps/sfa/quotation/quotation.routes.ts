import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const QUOTATION_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./quotation-list/quotation-list.component').then(m => m.QuotationListComponent), title: 'Quotation List' , canActivate: [authGuard] },
    { path: 'quotation-add', loadComponent: () => import('./quotation-add/quotation-add.component').then(m => m.QuotationAddComponent), title: 'Quotation Add' , canActivate: [authGuard] },
    { path: 'quotation-detail/:id/edit', loadComponent: () => import('./quotation-add/quotation-add.component').then(m => m.QuotationAddComponent), title: 'Quotation Edit' , canActivate: [authGuard] }, // <-- move this up
    { path: 'quotation-detail/:id', loadComponent: () => import('./quotation-detail/quotation-detail.component').then(m => m.QuotationDetailComponent), title: 'Quotation Detail' , canActivate: [authGuard] },
];
