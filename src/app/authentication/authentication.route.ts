import { Routes } from '@angular/router';
import { COMMING_SOON_ROUTES } from './coming-soon/comming-soon.routes';
import { authGuard } from '../core/auth/auth.guard';
// import { LOCK_SCREEN_ROUTES } from './lock-screen/lock-screen.routes';
export const AUTHENTICATION_ROUTES: Routes = [
    { path: 'comming-soon', children: COMMING_SOON_ROUTES, canActivate: [authGuard] },
    // { path: 'lock-screen', children: LOCK_SCREEN_ROUTES },
    
];
