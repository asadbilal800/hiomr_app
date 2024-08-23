import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { SharedService } from '../../services/shared.service';
import { StripeService } from '../../stripe.service';

@Component({
  selector: 'app-stripe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stripe.component.html',
  styleUrl: './stripe.component.css'
})
export class StripeComponent implements OnInit {
  stripeElement:StripeElements;
  paymentElement:StripePaymentElement;
  invoiceChoosed = false;
  paymentSuccess = false;
  constructor(private stripeService: StripeService,private sharedSerice: SharedService){

  }

  async ngOnInit() {
    await this.setupIntent();
  }

  async setupIntent(){
    let intentId = (this.sharedSerice.userData || [])[0]?.Setup_Intent_Id;
    let responseBody = !this.sharedSerice.failedPayment ? await this.stripeService.setupIntentCall() : await this.stripeService.fetchSetupIntent(intentId);
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
    const response:any = await this.sharedSerice.stripe.confirmSetup({
      elements: this.stripeElement,
      redirect:"if_required"
    });
    if (response.error) {this.showErrorMessageStripe();} 
    else { 
      let { setupIntent }  = response;
      this.showSuccessMessageStripe();
      let intentId = setupIntent?.id;
      await this.stripeService.updatePaymentBit(intentId);
    }
  }
  
   showErrorMessageStripe(){
      document.getElementById('stripe-text').style.display = 'none'
      document.getElementById('stripe-error').style.display = 'block'
      document.getElementById("StripeButton").innerHTML = 'First Case Fee ($50)';
      document.getElementById('stripe-success').style.display = 'none'
  }
  
  showSuccessMessageStripe(){
      this.paymentSuccess = true;
      document.getElementById('stripe-text').style.display = 'none'
      document.getElementById('stripe-error').style.display = 'none'
      document.getElementById('stripe-success').style.display = 'block'
      document.getElementById("payment-element").classList.add('d-none');
      document.getElementById('discountDropdown').classList.add('d-none');
      document.getElementById('stripeAuthorizeButton').classList.add('d-none');
      document.getElementById('stripeLogoInside').classList.add('d-none');
      document.getElementById("payment-span").innerHTML = "Preauthorization Successful";
      document.getElementById("autopayButton").classList.replace('btn-payment','btn-success');
  }

   chooseInvoicing(){
    this.stripeService.updatePaymentBit(null as any);
    this.invoiceChoosed = true;
  }
}
