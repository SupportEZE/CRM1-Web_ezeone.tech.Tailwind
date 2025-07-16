import { Routes } from '@angular/router';
import { CHAT_ROUTES } from './chat-module/chat.routes';
import { SOCIAL_ENGAGEMENTS_ROUTES } from './social-engagement-module/social-engagement.routes';
import { CALL_REQUEST_ROUTES } from './call-request/call-request.routes';
import { authGuard } from '../../../core/auth/auth.guard';


export const SUPPORT_ROUTES: Routes = [
    { path: 'chat', children: CHAT_ROUTES, canActivate: [authGuard]  },
    { path: 'social-engagement', children: SOCIAL_ENGAGEMENTS_ROUTES, canActivate: [authGuard]  },
    { path: 'call-request', children: CALL_REQUEST_ROUTES, canActivate: [authGuard]  },
];
