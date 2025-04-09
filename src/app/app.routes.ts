import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './views/auth/components/layout/auth.layout.component';
import { PublicLayoutComponent } from './views/public/components/public-layout/public-layout.component';
import { InvestorRoutes } from './views/investor/routes/investor.routes';
import { InvestorDashboardLayoutComponent } from './views/investor/components/dashboard-layout/dashboard.layout.component';
import { InvestorOnboardingPageComponent } from './views/investor/pages/InvestorOnboarding/InvestorOnboardingPage.component';

export const routes: Routes = [
  {
    path: 'investor',
    component: InvestorDashboardLayoutComponent,
    loadChildren: () => import('./views/investor/routes/investor.routes').then((m) => m.InvestorRoutes),
  },
  {
    path: 'auth', 
    component: AuthLayoutComponent,
    loadChildren: () => import('./views/auth/routes/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: 'investor-onboarding',
    component:InvestorOnboardingPageComponent
    // loadChildren: () => import('./views/public/routes/public.routes').then((m) => m.PublicRoutes),
  },
];
