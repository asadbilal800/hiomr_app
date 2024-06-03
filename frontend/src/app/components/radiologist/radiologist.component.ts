import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { PatientService } from '../../services/patient.service';
import { ReasonComponent } from "../reason/reason.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-radiologist',
    standalone: true,
    templateUrl: './radiologist.component.html',
    styleUrl: './radiologist.component.css',
    imports: [CommonModule, ReasonComponent]
})
export class RadiologistComponent {

  radioLogist: string;
  rush: string = '0'
  stat: string = '0'
  constructor(public sharedService: SharedService,private patientService: PatientService,private router: Router)
  {
    this.sharedService.reasonDisabled = true
  }

  onStatRushValChange(e:any){
    if(e.target.id == 'rush') {
      this.rush = (e.target.checked) ? '1' : '0'
    } 
    if(e.target.id == 'stat') {
      this.stat = (e.target.checked) ? '1' : '0'
    } 
  }
  accumalateValues(){
    let values = {rush: this.rush,stat: this.stat,radioLogist: this.radioLogist};
    this.sharedService.radiologistValues = values;
  }

  async submitPatientInfo(){
    this.accumalateValues();
    let payload = {
      patientInfo: this.sharedService.patientInfoValues,
      reasonInfo: this.sharedService.reasonArray.filter(x => x.checked),
      radiologistInfo: this.sharedService.radiologistValues,
      emailRelatedData: this.sharedService.emailRelatedData
    }
    let res = await this.patientService.savePatient(payload);
    let resultantSavedData = (res.response)?.data;
    this.saveDbSavedData(resultantSavedData);
    let route:string =  'home/' + (RoutePaths.Confirmation);
    this.router.navigate([route]);
  }

  disabledReason(){
    this.sharedService.reasonDisabled = !this.sharedService.reasonDisabled
  }

  disablePatient(id){
    const button:any = document.getElementById(id);
      button.disabled = !button.disabled;
  }

  saveDbSavedData(resultantSavedData:any){
    let savedData = {} as any;
    if(resultantSavedData?.patientDoctorData?.length){
       savedData.patient = resultantSavedData?.patientDoctorData[0];
       savedData.uploadPerson = savedData.patient?.uploadperson;
       savedData.uploadEmail = savedData.patient?.caseemail;
       savedData.doctorName = (savedData?.patient?.doctorfirstname ?? '') + ' ' + (savedData?.patient?.doctorlastname ?? '');
       delete savedData.patient.doctorfirstname;delete savedData.patient.doctorlastname;delete savedData.patient.caseemail;delete savedData.patient.uploadperson;
    }
    if(resultantSavedData?.reasonData?.length){
      savedData.reasons = resultantSavedData?.reasonData;
    }
    this.sharedService.dbSavedData = savedData;
  }

}
