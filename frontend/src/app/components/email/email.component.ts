import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { RoutePaths, SharedService } from '../../services/shared.service';

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
  previousInputEmailValue:string = '';
  emailButtonDisable = false;
  isRobot= false;
  userMessage:string = '';
  
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
    },{ validators: this.matchEmailsValidator.bind(this)});

  }
  async ngOnInit() {
    window['processToken'] = this.processToken;
    if(sessionStorage.getItem('userData') != undefined){
      let userData = JSON.parse(sessionStorage.getItem('userData'));
      this.sharedService.userData = [userData];
    }
    if(localStorage.getItem('email')){
      let email = localStorage.getItem('email');
      this.emailForm.patchValue({'email': email});
      await  this.checkEmailFromDB();
    }
  }

  matchEmailsValidator(form: FormGroup): ValidationErrors | null {
    let  email = form.get('email')?.value;
    let  recheckEmail = form.get('recheckEmail')?.value;
    return (email === recheckEmail && !!email && !!recheckEmail) ? null : { notMatched: true };
  }

  async checkEmailFromDB(reCheck:boolean = false){
    if(this.sharedService.userData?.length){
      this.userMessage = 'Locally checking your email, just a moment...';
      setTimeout(() => {
        this.emailFound = true;
        this.userMessage = 'Just your name';
      },2000);

    }

    else {
    if(!reCheck) this.userMessage = 'Finding your email, just a moment...';
    else this.userMessage = 'Checking again, just a moment...'
    if(reCheck && this.emailForm.hasError('notMatched')) {this.isVerified = false; return;}
    if(!this.emailForm.get('email').errors){
    let emailValue = this.emailForm.get('email')?.value;
    if((emailValue && this.previousInputEmailValue != emailValue) || reCheck){
      let response = await this.emailService.checkEmailMatchDB(emailValue);
      this.emailFound = (response?.response != null) ? true : false;
      if(response?.response?.length) {this.sharedService.userData = response.response;this.userMessage='Email Found 👍'}
      else {if(!reCheck) this.userMessage = "Check the email for typos and enter it again";}
      this.previousInputEmailValue = emailValue
    }
  }
  this.checkIfAllVerified();
}
  }

  checkIfAllVerified(){
    if(this.emailForm.status == 'VALID') {this.isVerified = true; this.userMessage = 'Ready 👍';}
    else if(this.emailFound && !this.emailForm.get('email').errors && !this.emailForm.get('name').errors)
      {this.isVerified = true;
       this.userMessage = 'Ready 👍'
      }
    else this.isVerified = false;
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
    if(!this.emailButtonDisable && !this.isRobot){
    this.emailButtonDisable = true;
    document.getElementById('trigger-captcha')?.click();
    this.performCaptchaActivity();
    }

  }

  async performCaptchaActivity() {
    setTimeout(async () => {
      let token = window['token'];
      let isHuman =  await this.checkToken(token)
      if(isHuman){
        this.navigate();
      }
      else {
          this.userMessage =  "ReCAPTCHA thinks you have a microprocessor for a brain. 🤖 Have you forgotten how to love?";
          this.isRobot = true;
      }
      this.emailButtonDisable = false;
    },2000)
  }

     processToken(token){
    window['token'] = token;
  }

  async checkToken(token){
   return this.emailService.callCaptcha(token);
  }

  navigate(){
      if(this.isVerified){
      if(this.saveEmailFuture && !!this.emailForm.get('email')?.value) localStorage.setItem('email',this.emailForm.get('email')?.value);
      else localStorage.removeItem('email');
      this.sharedService.emailRelatedData = this.emailForm.value;
      let route:string =  'home/' + (this.emailFound ? RoutePaths.SubmittingDoctor : RoutePaths.MatchPractice);
      this.router.navigate([route]);
      }
  }

} 
