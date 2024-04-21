import { Component, OnInit } from '@angular/core';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submitting-doctor',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './submitting-doctor.component.html',
  styleUrl: './submitting-doctor.component.css'
})
export class SubmittingDoctorComponent implements OnInit {

  userData: any ={};
  allUserData: any = {};
  emailRelatedData: any = {};
  firstNameDoctor:string = '';
  lastNameDoctor:string = '';
  okToNavigate = false;

  constructor(private sharedService: SharedService,private router:Router){
  }

  ngOnInit(): void {
    this.userData = this.sharedService.userData[0];
    this.allUserData = this.sharedService.userData;
    this.emailRelatedData = this.sharedService.emailRelatedData;
    
  }

  validate(event:any){
    if(event.target.value != ''){
      this.firstNameDoctor = '';
      this.lastNameDoctor = '';
      this.sharedService.selectedDoctorId = event.target.value;
      this.okToNavigate = true;
    }
  else {
    if(this.firstNameDoctor && this.lastNameDoctor){
      this.okToNavigate = true;
    }
    else this.okToNavigate = false;
  }
  }

  onNameChange(){
    if(this.firstNameDoctor && this.lastNameDoctor){
      this.okToNavigate = true;
    }
    else this.okToNavigate = false;
  }

  navigate(){
    if(this.firstNameDoctor && this.lastNameDoctor){
      let guidDoctor = this.sharedService.generateUUID();
      this.sharedService.selectedDoctorId = guidDoctor;
      this.sharedService.newDoctorScenario = true;
    }
    let route:string =  'home/' + (RoutePaths.PatientForm);
    this.router.navigate([route]);
    console.log(this.sharedService.selectedDoctorId);
  }

}
