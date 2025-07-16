import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { content } from './shared/routes/content.routes';
import { AuthenticationLayoutComponent } from './shared/layouts/authentication-layout/authentication-layout.component';
import { authen } from './shared/routes/auth.routes';
import { Error403Component } from './components/error/error403/error403.component';
export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('../app/authentication/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'lock-screen/cover',
    loadComponent: () =>import('../app/authentication/lock-screen/cover/cover.component').then((m) => m.CoverComponent),
  },
  {
    path: 'under-maintanace',
    loadComponent: () =>import('../app/authentication/under-maintanace/under-maintanace.component').then((m) => m.UnderMaintanaceComponent),
  },
  { path: '', component: ContentLayoutComponent, children: content },
  { path: '', component: AuthenticationLayoutComponent, children: authen },
  { path: 'unauthorized', component: Error403Component, children: authen },
  { path: '**', redirectTo: '/error/error404', pathMatch: 'full' },
];
