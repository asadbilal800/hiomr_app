import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { PatientService } from '../../services/patient.service';
import { ReasonComponent } from "../reason/reason.component";

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
  constructor(private sharedService: SharedService,private patientService: PatientService)
  {}

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
    await this.patientService.savePatient(payload)
    
  }

}
