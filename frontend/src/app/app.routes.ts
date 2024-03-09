import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
  { path: 'home', component:MainPageComponent },
  { path: 'email-page', loadChildren: () => import('./components/email/email.component').then(mod => mod.EmailPageComponent) },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to email-page
  { path: '**', redirectTo: '/home' } // Wildcard route for any other unmatched routes
];
