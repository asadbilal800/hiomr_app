import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main/main.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'home', component:MainPageComponent,
  children:[
  { path: 'email', loadComponent: () => import('./components/email/email.component').then(mod => mod.EmailPageComponent) },
  { path: 'submitting-doctor', loadComponent: () => import('./components/submitting-doctor/submitting-doctor.component').then(mod => mod.SubmittingDoctorComponent),canActivate:[AuthGuard] },
  { path: 'match-practice', loadComponent: () => import('./components/match-practice/match-practice.component').then(mod => mod.MatchPracticeComponent),canActivate:[AuthGuard]},
  { path: 'registration', loadComponent: () => import('./components/registration/registration.component').then(mod => mod.RegistrationComponent),canActivate:[AuthGuard]},
  { path: 'patientForm', loadComponent: () => import('./components/patient-info/patient-info.component').then(mod => mod.PatientInfoComponent),canActivate:[AuthGuard]},
  { path: 'reason', loadComponent: () => import('./components/reason/reason.component').then(mod => mod.ReasonComponent),canActivate:[AuthGuard]},
  { path: 'radiologist', loadComponent: () => import('./components/radiologist/radiologist.component').then(mod => mod.RadiologistComponent),canActivate:[AuthGuard]},
  { path: 'confirmation', loadComponent: () => import('./components/confirmation/confirmation.component').then(mod => mod.ConfirmationComponent),canActivate:[AuthGuard]},


  { path: '',   redirectTo: 'email', pathMatch: 'full'}, // Redirect empty path to email-page
]
},
  { path: '',   redirectTo: 'home', pathMatch: 'full' }, // Redirect empty path to email-page
  { path: '**', redirectTo: 'home' } // Wildcard route for any other unmatched routes
];
