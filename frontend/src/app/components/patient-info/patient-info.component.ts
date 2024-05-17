import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [NgxDropzoneModule,CommonModule,ReactiveFormsModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css'
})
export class PatientInfoComponent implements OnInit {
  public files: File[] = [];
  patientForm: FormGroup = {} as any;
  sexType: string = '';
  imageType: string = '';
  isVaidated = false;


constructor(private formBuilder: FormBuilder,private router: Router,private sharedService: SharedService){}

ngOnInit(): void {
  this.patientForm = this.formBuilder.group({
    imageDate: [null, [Validators.required]], // date object required
    internalId: ['', [Validators.required]], // string required
    firstName: ['', [Validators.required]], // string required
    lastName: ['', [Validators.required]], // string required
    birthDate: [null, [Validators.required]], // date object required
  }); 

  this.patientForm.valueChanges.subscribe(res => {
    this.IsValidated();
  });
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
