import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/auth/auth-layout/auth-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () =>import('./features/auth/auth.routes').then(m =>m.AuthRoutes)
        
    }
];
