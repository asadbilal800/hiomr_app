import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CBCTDD, RoutePaths, SharedService, SpecialityDD, StatesUSA } from '../../services/shared.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  
  regForm: FormGroup ={} as any;
  statesUSA = StatesUSA;
  specialityDD = SpecialityDD;
  CBCTDD = CBCTDD;
  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,private router: Router,private registrationService: RegistrationService) {}

  ngOnInit(): void {
  this.regForm = this.formBuilder.group({
    dFirstName: ['', Validators.required],
    dLastName: ['', Validators.required],
    practice: ['', Validators.required],
    street: ['', Validators.required],
    address2: [''], // optional field
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    practisePhoneNo: ['', Validators.required],
    practicePhoneNo2: [''], // optional field
    emailId: ['', [Validators.required, Validators.email]],
    billEmail: ['', [Validators.required, Validators.email]],
    specialty: ['', Validators.required],
    cbct: ['', Validators.required]
  });

  this.mapAddress();

  }

  mapAddress() {
    let result: any = this.sharedService.practiceAddress;
    if(result?.length){
    if (result.split('|')[0]) {
      this.regForm.patchValue({ street: result.split('|')[0] });
    }
    if (result.split('|')[1]) {
      this.regForm.patchValue({ city: result.split('|')[1] });
    }
    if (result.split('|')[2]) {
      this.regForm.patchValue({ zip: result.split('|')[2] });
    }
    if (result.split('|')[3]) {
      this.regForm.patchValue({ practisePhoneNo: result.split('|')[3] });
    }
    if (result.split('|')[4]) {
      this.regForm.patchValue({ state: result.split('|')[4] });
    }
    if (result.split('|')[5]) {
      this.regForm.patchValue({ emailId: result.split('|')[5] });
    }
    if (result.split('|')[6]) {
      this.regForm.patchValue({ practice: result.split('|')[6] });
    }
    if ((result.split('|') || [])[8]) {
      this.regForm.patchValue({ address2: result.split('|')[8] });
    }
  }
  }

  async doctorPracticeSave(){
    let payload = this.regForm.value;
    this.sharedService.selectedDoctorId = this.sharedService.generateUUID();
    payload = {...payload,email: this.sharedService.emailRelatedData.email,doctorId: this.sharedService.selectedDoctorId,practiceId: this.sharedService.userData[0].practiceid }
    return await this.registrationService.saveRegistration(payload); 
  }

  async navigateToPatientForm(){  
    document.body.style.cursor = 'wait'
     let res = await this.doctorPracticeSave();
     if(res?.IsSuccessful){
    let route:string =  'home/' + (RoutePaths.PatientForm);
    this.router.navigate([route]);
     }
     else {
      console.log('Seems like something went wrong.')
     }
  }

    // Getter function to easily access form controls
    get formControls() {
      return this.regForm.controls
    }





}
