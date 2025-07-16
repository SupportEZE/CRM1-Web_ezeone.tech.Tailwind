import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const ENQUIRY_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./enquiry-list/enquiry-list.component').then(m => m.EnquiryListComponent), title: 'Enquiry List' , canActivate: [authGuard]},
    { path: 'enquiry-add', loadComponent: () => import('./enquiry-add/enquiry-add.component').then(m => m.EnquiryAddComponent), title: 'Enquiry Add' , canActivate: [authGuard]},
    { path: 'enquiry-detail/:id', loadComponent: () => import('./enquiry-detail/enquiry-detail.component').then(m => m.EnquiryDetailComponent), title: 'Enquiry Detail' , canActivate: [authGuard]},
    { path: 'enquiry-detail/:id/:edit', loadComponent: () => import('./enquiry-add/enquiry-add.component').then(m => m.EnquiryAddComponent), title: 'Enquiry Edit' , canActivate: [authGuard]},
];
