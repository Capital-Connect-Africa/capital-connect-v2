import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/auth/layout/auth.layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AuthRoutes),
  },
];
