import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: 'home', component:MainPageComponent },
  { path: 'email-page', loadComponent: () => import('./components/email/email.component').then(mod => mod.EmailPageComponent) },
  { path: 'submitting-doctor', loadComponent: () => import('./components/submitting-doctor/submitting-doctor.component').then(mod => mod.SubmittingDoctorComponent) },
  { path: 'match-practice', loadComponent: () => import('./components/match-practice/match-practice.component').then(mod => mod.MatchPracticeComponent) },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to email-page
  { path: '**', redirectTo: '/home' } // Wildcard route for any other unmatched routes
];
