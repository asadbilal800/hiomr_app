import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'email-page', loadComponent: () => import('./email/email.component').then(mod => mod.EmailPageComponent)},
  ];