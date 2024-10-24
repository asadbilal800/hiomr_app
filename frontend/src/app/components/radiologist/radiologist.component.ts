import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { RoutePaths, SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-radiologist',
    standalone: true,
    templateUrl: './radiologist.component.html',
    styleUrl: './radiologist.component.css',
    imports: [CommonModule]
})
export class RadiologistComponent implements OnInit{

  radioLogist: string;
  rush: string = '0'
  stat: string = '0'
  isValidated = false;
  
  constructor(public sharedService: SharedService,private patientService: PatientService,private router: Router)
  {
  }
  async ngOnInit() {
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

  routeToVerifyPatient(){
    this.accumalateValues();
    let route:string =  'home/' + (RoutePaths.VetifyPatient);
    this.router.navigate([route]);
  }
 
}
