import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {path:'error',children:[
    {
      path: 'error401',
      loadComponent: () =>
        import('./error401/error401.component').then((m) => m.Error401Component),
    },
    {
      path: 'error404',
      loadComponent: () =>
        import('./error404/error404.component').then((m) => m.Error404Component),
    },
    {
      path: 'error500',
      loadComponent: () =>
        import('./error403/error403.component').then((m) => m.Error403Component),
    },
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class errorRoutingModule {
  static routes = admin;
}
