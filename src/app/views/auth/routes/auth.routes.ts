import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('../pages/signin/signin.component').then(c => c.SignInComponent)},
  { path: 'signup', loadComponent: () => import('../pages/signup/signup.component').then(c => c.SignupComponent)},
  { path: 'verify-email', loadComponent: () => import('../pages/verify-email/verify-email.component').then(c => c.VerifyEmailComponent)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutes { }