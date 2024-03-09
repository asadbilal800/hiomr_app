import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'email-page', loadChildren: () => import('./email/email.component').then(mod => mod.EmailPageComponent) },
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }, // Redirect empty path to email-page
  { path: '**', redirectTo: '/main-page' } // Wildcard route for any other unmatched routes
];
