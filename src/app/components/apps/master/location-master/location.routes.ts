import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';


export const LOCATION_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./location-master-list/location-master-list.component').then(m => m.LocationMasterListComponent), title: 'location Master', canActivate: [authGuard]},
];
