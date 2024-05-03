import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

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


constructor(private formBuilder: FormBuilder){}

ngOnInit(): void {
  this.patientForm = this.formBuilder.group({
    imageDate: [null, [Validators.required]], // date object required
    internalId: ['', [Validators.required]], // string required
    firstName: ['', [Validators.required]], // string required
    lastName: ['', [Validators.required]], // string required
    birthDate: [null, [Validators.required]], // date object required
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

  console.log(this.sexType);
  console.log(this.imageType);
  console.log(this.patientForm.value);
}

}
