import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class PopupComponent {
  constructor(private sharedService:SharedService){}
  @Input() message: string = ''; // Text to display
  @Input() showCloseButton = false;

  close(){
    this.sharedService.bsModalRefToaster?.hide();
  }
}
