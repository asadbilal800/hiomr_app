import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'email-page', loadComponent: () => import('./email-page/email-page.component').then(mod => mod.EmailPageComponent)},
  ];