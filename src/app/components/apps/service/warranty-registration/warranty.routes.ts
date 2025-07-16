import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const WARRANTY_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./warranty-registration-list/warranty-registration-list.component').then(m => m.WarrantyRegistrationListComponent), title: 'Warranty List', canActivate: [authGuard]  },
    { path: 'warranty-detail/:id/:activeTab', loadComponent: () => import('./warranty-registration-detail/warranty-registration-detail.component').then(m => m.WarrantyRegistrationDetailComponent), title: 'Warranty Detail', canActivate: [authGuard]  },
    { path: 'warranty-add', loadComponent: () => import('./warranty-registration-add/warranty-registration-add.component').then(m => m.WarrantyRegistrationAddComponent), title: 'Warranty Add', canActivate: [authGuard]  },
];
