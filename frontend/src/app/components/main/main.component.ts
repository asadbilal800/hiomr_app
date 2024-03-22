import { Component } from '@angular/core';
import { EmailPageComponent } from '../email/email.component';
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [EmailPageComponent, FooterComponent,RouterOutlet]
})
export class MainPageComponent {

}
