import { Routes } from '@angular/router';
import { TICKET_ROUTES } from './ticket/ticket.routes';
import { authGuard } from '.././../../core/auth/auth.guard';

export const INDEPENDENT_ROUTES: Routes = [
    { path: 'ticket-list', children: TICKET_ROUTES, canActivate: [authGuard] },
    
];
