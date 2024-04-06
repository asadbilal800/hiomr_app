import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ApiHandlerService } from '../../services/api-handler.service';
import { EndpointURLS } from '../../global';
import { EmailService } from '../../services/email.service';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
})
export class EmailPageComponent implements OnInit {

  emailForm: FormGroup;
  saveEmailFuture: boolean = false;
  emailFound:any = null;
  isVerified = false;
  constructor(
    private emailService: EmailService,private formBuilder: FormBuilder,
    private sharedService:SharedService,
    private router:Router
    ){

    this.sharedService.isInProgress = true;
    let storedEmailValue = localStorage.getItem('email');
    this.emailForm = this.formBuilder.group({
      email: [storedEmailValue ?? '', [Validators.email,Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      recheckEmail: ['', [Validators.required,Validators.email]],
    },{ validators: this.matchEmailsValidator.bind(this) });

  }
  ngOnInit(): void {
    window['processToken'] = this.processToken;
  }

  matchEmailsValidator(form: FormGroup): ValidationErrors | null {
    let  email = form.get('email')?.value;
    let  recheckEmail = form.get('recheckEmail')?.value;
    return email === recheckEmail ? null : { notMatched: true };
  }

  async checkEmailFromDB(reCheck:boolean = false){
    if(reCheck && this.emailForm.hasError('notMatched')) return;
    let emailValue = this.emailForm.get('email')?.value
    if(emailValue){
      let response = await this.emailService.checkEmailMatchDB(emailValue);
      this.emailFound = (response?.response != null) ? true : false;
      if(response?.response?.length){
        this.sharedService.userData = response.response
      }
    if(reCheck || this.emailFound) this.isVerified = true;
    }   
    }


  // Getter function to easily access form controls
  get formControls() {
    return this.emailForm.controls
  }
      
  // Getter function to easily access form controls
  get formControl() {
    return this.emailForm
  }

  navigateInit(){
    document.getElementById('trigger-captcha')?.click();
  }

  async  processToken(token){
    let isHuman =  await this.checkToken(token)
    if(isHuman){
      this.navigate();
    }
    else {
        (document as any).getElementById("userMessage").innerHTML = "ReCAPTCHA thinks you have a microprocessor for a brain. 🤖 Have you forgotten how to love?" ;
        console.log("Failed recaptcha");
    }
  }

  async checkToken(token){
   return this.emailService.verifyCaptcha(token);
  }

  navigate(){
    
    if(this.saveEmailFuture && !!this.emailForm.get('email')?.value) localStorage.setItem('email',this.emailForm.get('email')?.value);
    else localStorage.removeItem('email');
    this.sharedService.emailRelatedData = this.emailForm.value;
    
    let route:string =  'home/' + (this.emailFound ? RoutePaths.SubmittingDoctor : RoutePaths.MatchPractice);
    this.router.navigate([route]);
  }

} 
