import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-reason',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reason.component.html',
  styleUrl: './reason.component.css'
})
export class ReasonComponent implements OnInit{

  reasonArray; any = [];
  isValidated = false;
  @Input() hideHeading = true;


  constructor(public sharedService: SharedService,private router: Router,private patientService:PatientService){
    this.reasonArray = this.sharedService.reasonArray
  }
  async ngOnInit() {
    //initiate upload to bucket
   if(this.sharedService.patientInfoValues.hasFiles) await this.patientService.uploadToBcuket(this.sharedService.userData[0]?.practiceid,this.sharedService.patientInfoValues.Id);
  }
  
  changeCheckBoxVal(event:any,code:number){
    const isChecked = event.target.checked;
    let reasonItem = this.reasonArray.find(x => x.code == code);
    if(reasonItem) reasonItem.checked = isChecked;
    let reasonItemChecked = this.reasonArray.filter(x => x.checked);
    this.isValidated = (reasonItemChecked.filter(x => (x.code != 7 && x.code != 99))).every(x => !!x.desc);

    if(isChecked){
    if(code == 99) this.reasonArray.filter(x => x.isOverread == false).forEach(x => x.isDisable = true);
    else this.reasonArray.filter(x => x.isOverread == true).forEach(x => x.isDisable = true);
    }
    else {
      this.reasonArray.find(x => x.code == code).desc = ''
      let ifAllUnchecked = this.reasonArray.every(x => x.checked == false);
      if(ifAllUnchecked) {
        this.reasonArray.forEach(x => x.isDisable = false);
        this.isValidated = false;
      }
    }
    
  }

  fetchProp(code:number,propName:string){
    let reasonItem  = this.reasonArray.find(x => x.code == code);
    if(reasonItem) return reasonItem[propName];
    return ''
  }

  onDescChange(event:any,code: number){
    let reasonItem  = this.reasonArray.find(x => x.code == code);
    if(reasonItem) reasonItem.desc = event.target.value;
    this.isValidated =  (this.checkIfValidated()) ? true: false
  }

  checkIfValidated(){
    let reasonItems = this.sharedService.reasonArray.filter(x => x.checked && (x.code !== 7 && x.code !== 99));
    if(reasonItems.every(x => !!x.desc)) return true;
    else return false
  }

  navigate(){
    let route:string =  'home/' + (RoutePaths.Radiologist);
    this.router.navigate([route]);
  }
  

}
