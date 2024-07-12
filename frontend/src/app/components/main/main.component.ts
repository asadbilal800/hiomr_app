import { Component, OnInit } from '@angular/core';
import { EmailPageComponent } from '../email/email.component';
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { routePathHeaderPrecedence } from '../../services/shared.service';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [CommonModule, EmailPageComponent, FooterComponent,RouterOutlet]
})
export class MainPageComponent implements OnInit {
    public currentRoute = 'email';
    constructor(private router: Router, private activatedRoute: ActivatedRoute){
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(() => {
            this.currentRoute = (window.location.href.split('/')).pop();
          });
        }

        checkRoutePrecedenceForCompletion(routePrecedenceNumber:number,route:string[]){
          if(route.includes(this.currentRoute)) return false
          let currentPrecedence  = routePathHeaderPrecedence[this.currentRoute];
          return (currentPrecedence >= routePrecedenceNumber)  ? true : false
        }
    }


