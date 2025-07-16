import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutingModule } from '../../components/dashboards/dashboards.routes';
import { appsRoutingModule } from '../../components/apps/apps.routes';

export const content: Routes = [
  { path: '', children: [
    ...dashboardRoutingModule.routes,
    ...appsRoutingModule.routes,
  ]}
];
@NgModule({
  // imports: [RouterModule.forRoot()],
  exports: [RouterModule]
})
export class SaredRoutingModule { }
