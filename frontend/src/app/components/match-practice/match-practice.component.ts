import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePaths, SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-match-practice',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './match-practice.component.html',
  styleUrl: './match-practice.component.css',
})
export class MatchPracticeComponent {

  matchPracticeForm: FormGroup;
  saveEmailFuture: boolean = false;
  emailFound:any = null;
  isVerified = false;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService:SharedService,
    private router:Router
    ){

    this.sharedService.isInProgress = true;
    let storedEmailValue = localStorage.getItem('email');
    this.matchPracticeForm = this.formBuilder.group({
      email: [{value:storedEmailValue ?? '',disabled: true}, [Validators.email,Validators.required]],
      name: [{value:'', disabled: true},, [Validators.required, Validators.minLength(2)]],
      practiceName: ['', [Validators.required,Validators.email]],
    });

  }

  // Getter function to easily access form controls
  get formControls() {
    return this.matchPracticeForm.controls
  }
      
  // Getter function to easily access form controls
  get formControl() {
    return this.matchPracticeForm
  }

  navigate(){
    
    if(this.saveEmailFuture && !!this.matchPracticeForm.get('email')?.value) localStorage.setItem('email',this.matchPracticeForm.get('email')?.value);
    else localStorage.removeItem('email');
    
    let route:string =  'home/' + (this.emailFound ? RoutePaths.SubmittingDoctor : RoutePaths.MatchPractice);
    this.router.navigate([route]);
  }

} 
