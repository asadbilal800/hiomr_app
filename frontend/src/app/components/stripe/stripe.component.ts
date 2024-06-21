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

   async submitIntentForm(event){  
    event.preventDefault();
    event.stopPropagation();
    await this.finalizeStripe();
  }

  async  finalizeStripe(){
    document.getElementById("StripeButton").innerHTML = 'Sending...';
    document.getElementById("chooseInvoices").classList.add('d-none');
    document.getElementById("invoiceMessage").classList.add('d-none');
    document.getElementById('stripe-text').style.display = 'block'
    document.getElementById('stripe-error').style.display = 'none';
    const {error} = await this.sharedSerice.stripe.confirmSetup({
      elements: this.stripeElement,
      redirect:"if_required"
    });
    if (error) {this.showErrorMessageStripe();} 
    else { this.showSuccessMessageStripe();}
  }
  
   showErrorMessageStripe(){
      document.getElementById('stripe-text').style.display = 'none'
      document.getElementById('stripe-error').style.display = 'block'
      document.getElementById("StripeButton").innerHTML = 'First Case Fee ($50)';
      document.getElementById('stripe-success').style.display = 'none'
      document.getElementById("stripe-body").style.cursor = "auto";
  }
  
  showSuccessMessageStripe(){
    let practiceId = localStorage.getItem('practiceId');
    //set PAYMENT BIT HERE
    localStorage.setItem('payment','1');
      document.getElementById('stripe-text').style.display = 'none'
      document.getElementById('stripe-error').style.display = 'none'
      document.getElementById('stripe-success').style.display = 'block'
      document.getElementById("payment-element").classList.add('d-none');
      document.getElementById('discountDropdown').classList.add('d-none');
      document.getElementById('stripeAuthorizeButton').classList.add('d-none');
      document.getElementById('stripeLogoInside').classList.add('d-none');
      var buttons = document.getElementsByClassName("stripe-link"); 
      for(var i = 0; i < buttons.length; i++){
          (buttons[i] as any).style.cursor = "pointer"};
      document.getElementById("submitAnotherCaseButton").style.cursor = "pointer";
      document.getElementById("stripe-body").style.cursor = "auto";
      document.getElementById("payment-span").innerHTML = "Preauthorization Successful";
      document.getElementById("autopayButton").classList.replace('btn-payment','btn-success');
  }
}
