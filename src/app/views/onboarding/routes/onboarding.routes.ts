import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'business', loadComponent: () => import('../pages/company-information/company-information.component').then(c => c.CompanyInformationComponent)},
  { path: 'business/company-details', loadComponent: () => import('../pages/company-information/company-information.component').then(c => c.CompanyInformationComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OnboardingRoutes { }