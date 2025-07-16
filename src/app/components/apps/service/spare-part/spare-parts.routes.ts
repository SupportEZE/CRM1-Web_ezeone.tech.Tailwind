import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const SPARE_PARTS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./spare-part-list/spare-part-list.component').then(m => m.SparePartListComponent), title: 'Spare Part List', canActivate: [authGuard]  },
    { path: 'spare-part-detail/:id/:activeTab', loadComponent: () => import('./spare-part-detail/spare-part-detail.component').then(m => m.SparePartDetailComponent), title: 'Spare Part Detail', canActivate: [authGuard]  },
    { path: 'spare-part-add', loadComponent: () => import('./spare-part-add/spare-part-add.component').then(m => m.SparePartAddComponent), title: 'Spare Part Add', canActivate: [authGuard]  },
];
