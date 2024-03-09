import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, debounceTime, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ApiHandlerService } from '../../services/api-handler.service';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailPageComponent {

  myForm: FormGroup;
  constructor(private apiService: ApiHandlerService,private formBuilder: FormBuilder){
    this.myForm = this.formBuilder.group({
      email: [this.emailAsyncValidator()],
      uploaderName: ['', [Validators.required, Validators.minLength(2)]],
      recheckEmailinput: ['', Validators.email],
      // Add more form controls as needed
    });
  }

   checkEmailMatchDB(id: string){
      return this.apiService.Get(environment.api_url+'checkEmailDB');
  }

  emailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;

      return this.checkEmailMatchDB(email).pipe(
        debounceTime(300),
        map(isAvailable => (isAvailable ? null : { emailTaken: true })),
        catchError(() => of(null)) // Handle errors (optional)
      );
    };
  }

} 
