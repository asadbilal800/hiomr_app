import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { StripeComponent } from '../stripe/stripe.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, StripeComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
  providers:[DatePipe]
})
export class ConfirmationComponent implements OnInit {
  doctorName:string = '';
  uploadPerson: string = '';
  uploadEmail:string = '';
  reasons:any = '';
  patient:string;
  patientSex:string;
  patientDob:string;
  userData:any;
  constructor(public sharedService: SharedService,private datePipe: DatePipe,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.patchData();
    this.userData = this.sharedService.userData[0];
    sessionStorage.setItem('userData',JSON.stringify(this.userData));
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
          this.reasons += (this.sharedService.reasonArray.find(x => x.code == +item.reason).name) + ' | ' + item.patdocnotes + " \n";
        }
      });
      this.reasons = this.sanitizer.bypassSecurityTrustHtml(this.reasons)
    }
    if (this.sharedService.dbSavedData?.patient) {
      let patient = this.sharedService.dbSavedData?.patient;
      let patientString = '';
    
      if (patient?.firstname) {
        patientString += `${patient.firstname} `;
      }
    
      if (patient?.lastname) {
        patientString += `${patient.lastname} `;
      }
    
      if (patient?.internalid) {
        patientString += `${patient.internalid} `;
      }
    
      if (patient?.dob) {
        this.patientDob = new Date(patient.dob) as any; 
        this.patientDob = this.datePipe.transform(this.patientDob, 'dd, MMMM yyyy');
      }
    
      this.patient = patientString;
    }
        
  }
}
