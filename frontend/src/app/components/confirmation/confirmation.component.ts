import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  doctorName:string = '';
  uploadPerson: string = '';
  uploadEmail:string = '';
  patient:any;
  reasons:any = '';
  patientFirstname: string;
  patientLastname: string;
  patientInternalId: string;
  patientDob: Date;
  patientSex: string;
  constructor(public sharedService: SharedService){}
  ngOnInit(): void {
    this.patchData();
  }

  patchData(){
    if(this.sharedService.dbSavedData?.uploadEmail){
      this.uploadEmail = this.sharedService.dbSavedData?.uploadEmail
    }
    if(this.sharedService.dbSavedData?.uploadPerson){
      this.uploadPerson = this.sharedService.dbSavedData?.uploadPerson
    }
    if(this.sharedService.dbSavedData?.doctorName){
      this.doctorName = this.sharedService.dbSavedData?.doctorName
    }
    if(this.sharedService?.dbSavedData?.reasons?.length){
      let reasonLength = this.sharedService?.dbSavedData?.reasons?.length
      this.sharedService?.dbSavedData?.reasons.forEach((item,index) => {
        if(item?.reason){
          this.reasons += (this.sharedService.reasonArray.find(x => x.code == +item.reason).name) + ' | ' + item.patdocnotes + " , ";
        }
      });
    }
    if(this.sharedService.dbSavedData?.patient){
      let patient = this.sharedService.dbSavedData?.patient;
      if(patient?.firstname){
        this.patientFirstname = patient?.firstname
      }

      if(patient?.lastname){
        this.patientLastname = patient?.lastname
      }

      if(patient?.internalid){
        this.patientInternalId = patient?.internalid
      }

      if(patient?.dob){
        this.patientDob = new Date(patient?.dob)
      }

      if(patient?.sex){
        this.patientSex = (patient?.sex == 1 ? 'Male' : (patient?.sex == 2 ? 'Female': 'InterSex') );
      }

      debugger
    }


    
  }
}
