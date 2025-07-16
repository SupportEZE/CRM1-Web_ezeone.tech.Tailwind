import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';
import { getClientComponent } from '../../../../utility/client-loader';

export const ENQUIRY_ROUTES: Routes = [
    {
        path: '',
        loadComponent: async () => getClientComponent('list'),
        title: 'Enquiry List',
        canActivate: [authGuard]
    },
    
    {
        path: 'enquiry-add',
        loadComponent: async () => getClientComponent('add'),
        title: 'Enquiry Add',
        canActivate: [authGuard]
    },
    
    {
        path: 'enquiry-detail/:id',
        loadComponent: async () => getClientComponent('detail'),
        title: 'Enquiry Detail',
        canActivate: [authGuard]
    },
    
    {
        path: 'enquiry-detail/:id/:edit',
        loadComponent: async () => getClientComponent('edit'),
        title: 'Enquiry Edit',
        canActivate: [authGuard]
    }
];
