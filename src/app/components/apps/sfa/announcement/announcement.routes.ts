import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const ANNOUNCEMENT_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./announcement-list/announcement-list.component').then(m => m.AnnouncementListComponent), title: 'Announcement List', canActivate: [authGuard] },
    { path: 'announcement-add', loadComponent: () => import('./announcement-add/announcement-add.component').then(m => m.AnnouncementAddComponent), title: 'Announcement Add', canActivate: [authGuard] },
    { path: 'announcement-detail/:id', loadComponent: () => import('./announcement-detail/announcement-detail.component').then(m => m.AnnouncementDetailComponent), title: 'Announcement Detail', canActivate: [authGuard] },
];