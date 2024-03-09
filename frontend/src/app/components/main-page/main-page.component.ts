import { Component } from '@angular/core';
import { EmailPageComponent } from '../email/email.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [EmailPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
