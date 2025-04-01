import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'onboarding', loadComponent: () => import('../pages/InvestorOnboarding/InvestorOnboardingPage.component').then(c => c.InvestorOnboardingPageComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutes { }