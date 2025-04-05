import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'business', 
      children: [
      { path: 'organization-setup', loadComponent: () =>import('../pages/business/organization/landing/landing.component').then(c =>c.LandingComponent) }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OnboardingRoutes { }