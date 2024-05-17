import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-radiologist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radiologist.component.html',
  styleUrl: './radiologist.component.css'
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
      radiologistInfo: this.sharedService.radiologistValues
    }
    await this.patientService.savePatient(payload)
    
  }

}
