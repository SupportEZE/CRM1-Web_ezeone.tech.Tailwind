import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';

export const TICKET_ROUTES: Routes = [
  
  { path: '', loadComponent: () => import('./ticket-list/ticket-list.component').then(m => m.TicketListComponent), title: 'Ticket List', canActivate: [authGuard] },
  { path: 'ticket-detail/:id' , loadComponent: () => import('./ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent), title: 'Ticket Detail', canActivate: [authGuard] },
  
];
