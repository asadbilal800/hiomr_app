import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { ApiHandlerService } from '../../services/api-handler.service';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
})
export class EmailPageComponent {

  emailForm: FormGroup;
  saveEmailCheck: boolean = false;
  emailFound = false;
  constructor(private apiService: ApiHandlerService,private formBuilder: FormBuilder){

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.email,Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      recheckEmail: ['', [Validators.required,Validators.email]],
    },{ validators: this.matchEmailsValidator.bind(this) });

  }

  matchEmailsValidator(form: FormGroup): ValidationErrors | null {
    let  email = form.get('email')?.value;
    let  recheckEmail = form.get('recheckEmail')?.value;
    return email === recheckEmail ? null : { notMatched: true };
  }

  async checkEmailFromDB(){
    let emailValue = this.emailForm.get('email')?.value
    if(emailValue){
      let response = await this.checkEmailMatchDB(emailValue);
      if(response?.IsSuccessful)
      this.emailFound = true;
    }   
    }

   checkEmailMatchDB(id: string){
      return this.apiService.Get(environment.api_url+'checkEmailDB').toPromise();
  }

      // Getter function to easily access form controls
      get formControls() {
        return this.emailForm.controls
      }
      
      // Getter function to easily access form controls
      get formControl() {
       return this.emailForm
      }

} 
