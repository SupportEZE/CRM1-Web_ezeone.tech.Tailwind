import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const POINT_CATEGORY_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./point-category-list/point-category-list.component').then(m => m.PointCategoryListComponent), title: 'Point Category', canActivate: [authGuard] },
    { path: 'points-category-add', loadComponent: () => import('./point-category-add/point-category-add.component').then(m => m.PointCategoryAddComponent), title: 'Point Category', canActivate: [authGuard] }, 
    { path: 'points-category-edit/:edit/:id', loadComponent: () => import('./point-category-add/point-category-add.component').then(m => m.PointCategoryAddComponent), title: 'Point Category', canActivate: [authGuard] }, 
];
