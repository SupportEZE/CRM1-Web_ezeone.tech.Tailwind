import { Routes } from '@angular/router';

export const SOCIAL_ENGAGEMENTS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./social-engagement-list/social-engagement-list.component').then(m => m.SocialEngagementListComponent), title: 'Social Engagement List' },
];
