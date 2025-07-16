import { Routes } from '@angular/router';

export const CHAT_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent), title: 'Chat' },
];
