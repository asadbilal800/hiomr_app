import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { StripeService } from '../../stripe.service';
import { SubmittingDoctorService } from '../../services/submitting-doctor.service';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [NgxDropzoneModule,CommonModule,ReactiveFormsModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css'
})
export class PatientInfoComponent implements OnInit {
  public files: File[] = [];
  patientForm: FormGroup;
  sexType: string = '';
  imageType: string = '';
  isVaidated = false;


constructor(private submittingDoctorService: SubmittingDoctorService, private stripeService:StripeService, private formBuilder: FormBuilder,private router: Router,private sharedService: SharedService){

  this.patientForm = this.formBuilder.group({
    imageDate: [null, [Validators.required]], // date object required
    internalId: ['', [Validators.required]], // string required
    firstName: ['', [Validators.required]], // string required
    lastName: ['', [Validators.required]], // string required
    birthDate: [null, [Validators.required]], // date object required
  }); 
}

async ngOnInit() {


  await this.initStripeRelatedDataIfRequired();
  this.checkIfNewDoctorScenario()


  this.patientForm.valueChanges.subscribe(res => {
    this.IsValidated();
  });
}

checkIfNewDoctorScenario(){
  if(this.sharedService.newDoctorScenario){
    let payload = this.sharedService.newDoctorPayload;
    this.submittingDoctorService.saveNewDoctor(payload);
  }
}

async initStripeRelatedDataIfRequired(){
  let userData = this.sharedService.userData[0];
  if(userData?.payment != 1) {
    await this.sharedService.initStripe();
    let stripeCustomer = await  this.stripeService.setupStripeCustomer();
    if(stripeCustomer) this.sharedService.stripeCustomerId = stripeCustomer;
  }
}



onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

selectedOption(event,type:string){
  if(type == 'imageType'){
    this.imageType = event.target.value;
  }
  else this.sexType = event.target.value;

  this.IsValidated();
}

IsValidated(){
 this.isVaidated = (this.patientForm.valid && !!this.sexType && !!this.imageType) ? true : false;
}

accumalateValues(){
  let values = {...this.patientForm.value,sexType: this.sexType,imageType: this.imageType,doctorId: this.sharedService.selectedDoctorId};
  this.sharedService.patientInfoValues = values;
}


navigate(){ 
  this.accumalateValues();
  let route:string =  'home/' + (RoutePaths.Reason);
  this.router.navigate([route]);
}

}
