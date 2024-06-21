import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../stripe.service';
import { SharedService } from '../../services/shared.service';
import { StripeElement, StripeElements, StripePaymentElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe',
  standalone: true,
  imports: [],
  templateUrl: './stripe.component.html',
  styleUrl: './stripe.component.css'
})
export class StripeComponent implements OnInit {
  stripeElement:StripeElements;
  paymentElement:StripePaymentElement;
  constructor(private stripeService: StripeService,private sharedSerice: SharedService){

  }

  async ngOnInit() {
    await this.setupIntent();
  }

  async setupIntent(){
    let responseBody = await this.stripeService.setupIntentCall();
    if(responseBody?.response){
      let res = responseBody.response
      let clientSecret  = res.client_secret;
      const options:any = {
        clientSecret: clientSecret,
        appearance : {theme: 'flat'}
      };
      await this.sharedSerice.initStripe();
      try{
      this.stripeElement = this.sharedSerice.stripe.elements(options);
      this.paymentElement = this.stripeElement.create('payment');
      this.paymentElement.mount('#payment-element');
      }
      catch(error){
        console.log(error)
      }
      
    }
  }
}
