import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './views/auth/components/layout/auth.layout.component';
import { PublicLayoutComponent } from './views/public/components/public-layout/public-layout.component';
import { OnboardingLayoutComponent } from './views/onboarding/components/layout/onboarding-layout/onboarding-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () => import('./views/public/routes/public.routes').then((m) => m.PublicRoutes),
  },
  {
    path: 'auth', 
    component: AuthLayoutComponent,
    loadChildren: () => import('./views/auth/routes/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: 'onboarding', 
    component: OnboardingLayoutComponent,
    loadChildren: () => import('./views/onboarding/routes/onboarding.routes').then((m) => m.OnboardingRoutes),
  },
];
