import { Component } from '@angular/core';
import { RoutePaths, SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { ReasonComponent } from '../../reason/reason.component';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-verify-patient',
  standalone: true,
  templateUrl: './verify-patient.component.html',
  styleUrl: './verify-patient.component.css',
  imports: [CommonModule, ReasonComponent]

})
export class VerifyPatientComponent {
  constructor(public sharedService: SharedService,private patientService: PatientService,private router: Router){
    this.sharedService.reasonDisabled = true
  }
  
  disablePatient(id){
    const button:any = document.getElementById(id);
      button.disabled = !button.disabled;
  }

  disabledReason(){
    this.sharedService.reasonDisabled = !this.sharedService.reasonDisabled
  }

  async submitPatientInfo(){
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
