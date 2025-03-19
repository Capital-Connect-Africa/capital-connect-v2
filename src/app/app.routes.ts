import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/auth/components/layout/auth.layout.component';
import { PublicLayoutComponent } from './features/public/components/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () => import('./features/public/public.routes').then((m) => m.PublicRoutes),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AuthRoutes),
  },
];
