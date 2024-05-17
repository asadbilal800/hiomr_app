import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  constructor()
  {}

  onStatRushValChange(e:any){
    if(e.target.id == 'rush') {
      this.rush = (e.target.checked) ? '1' : '0'
    } 
    if(e.target.id == 'stat') {
      this.stat = (e.target.checked) ? '1' : '0'
    } 
  }

  submitPatientInfo(){
    
  }

}
