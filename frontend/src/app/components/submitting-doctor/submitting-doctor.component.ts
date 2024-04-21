import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-submitting-doctor',
  standalone: true,
  imports: [],
  templateUrl: './submitting-doctor.component.html',
  styleUrl: './submitting-doctor.component.css'
})
export class SubmittingDoctorComponent implements OnInit {

  userData: any ={};
  emailRelatedData: any = {};
  constructor(private sharedService: SharedService){
     console.log(this.sharedService.emailRelatedData);
     console.log(this.sharedService.userData);
  }

  ngOnInit(): void {
    this.userData = this.sharedService.userData[0];
    this.emailRelatedData = this.sharedService.emailRelatedData;
    
  }

}
