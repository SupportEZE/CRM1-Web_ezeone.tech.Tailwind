import { Routes } from '@angular/router';

export const COMPLAINT_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./complaint-list/complaint-list.component').then(m => m.ComplaintListComponent), title: 'Complaint List' },
    { path: 'complaint-detail/:id', loadComponent: () => import('./complaint-detail/complaint-detail.component').then(m => m.ComplaintDetailComponent), title: 'Complaint Detail' },
    { path: 'complaint-add', loadComponent: () => import('./complaint-add/complaint-add.component').then(m => m.ComplaintAddComponent), title: 'Complaint Add' },
];
