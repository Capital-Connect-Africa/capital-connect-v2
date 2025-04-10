import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'business', 
      children: [
      { 
        path: 'organization-setup', 
        children: [
        {
          path: '',
          pathMatch: 'full',
          loadComponent: () =>import('../pages/business/organization/landing/landing.component').then(c =>c.LandingComponent), 
        },
          {
            path: 'success',
            loadComponent: () =>import('../pages/business/organization/success/success.component').then(c =>c.SuccessComponent), 
          },
          {
            path: ':step',
            loadComponent: () =>import('../pages/business/organization/setup/setup.component').then(c =>c.SetupComponent), 
          }
        ]
      }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OnboardingRoutes { }