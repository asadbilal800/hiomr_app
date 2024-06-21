import { Injectable } from '@angular/core';
import { ApiHandlerService } from './services/api-handler.service';
import { environment } from '../environments/environment';
import { EndpointURLS } from './global';
import { SharedService } from './services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private apiService: ApiHandlerService,private sharedService: SharedService) { }

  async setupStripeCustomer(){
    let emailRelatedData = this.sharedService.emailRelatedData;
    let userData = this.sharedService.userData[0];
    let body = {name: emailRelatedData.name,email: emailRelatedData.email,practiceid: userData.practiceid};
    return await this.apiService.Post(environment.api_url+ EndpointURLS.StripeCustomer,body).toPromise();

  }

  async setupIntentCall(){
    let body = {payment_method_types: ['card'],customer: this.sharedService.stripeCustomerId};
    return await this.apiService.Post(environment.api_url+ EndpointURLS.SetupIntentStripe,body).toPromise();
  }
}
