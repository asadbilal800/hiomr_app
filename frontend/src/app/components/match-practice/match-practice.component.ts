import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePaths, SharedService } from '../../services/shared.service';
import { MatchPracticeService } from '../../services/match-practice.service';
declare var google: any;


@Component({
  selector: 'app-match-practice',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './match-practice.component.html',
  styleUrl: './match-practice.component.css',
})
export class MatchPracticeComponent implements AfterViewInit {

  matchPracticeForm: FormGroup;
  saveEmailFuture: boolean = false;
  foundPractice:any = null;
  isClickable = false;
  @ViewChild('practiceInput') practiceNameInput: any;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService:SharedService,
    private router:Router,
    private matchPracticeService: MatchPracticeService
    ){
    this.matchPracticeForm = this.formBuilder.group({
      email: [{value:this.sharedService.emailRelatedData.email ?? '',disabled: true}, [Validators.email,Validators.required]],
      name: [{value:this.sharedService.emailRelatedData.name ?? '', disabled: true}, [Validators.required, Validators.minLength(2)]],
      practiceName: ['', [Validators.required,Validators.email]],
    });

  }
  ngAfterViewInit(): void {
    (window as any)._this = this;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA2t8G0nk86Vu-T8SMaPX2gaCHUzWGcBKA&libraries=places';
    document.body.appendChild(script);
    script.onload = function(){
      // google.script.run.deletePractiseAddress();
      let input: any = document.getElementById('practiseName');
      const options = {
        fields: ["ALL"],
        strictBounds: false,
        types: ["establishment"],
        componentRestrictions: {country: "us"}
        
      };
        var autocomplete: any = new google.maps.places.Autocomplete(input,options);
        
        // Add a listener to the Autocomplete object to capture the place details
        autocomplete.addListener('place_changed', function() {
          (window as any)._this.setClickableValue(true);
          var place: any = autocomplete.getPlace();
          console.log(place);
          var streetAddress = '';
          var city = '';
          var zip = '';
          var phone = '';
          var state = '';
          var name = '';
          var website = place?.website;
          var practiseName;
          var typedEmail = (window as any)._this.sharedService.emailRelatedData.email;
          let practiceSubDetails = null;
    
    
          if(place?.formatted_phone_number){
            phone = place.formatted_phone_number
          }
    
          if(place?.name){
            name = place.name;
            practiseName = place?.name;
            const delimiter1 = ',';
            const delimiter2 = ';';
            const delimiter3 = '|';
            practiseName = name.split(',').flatMap(x => x.split('|')).flatMap(x => x.split('-'))[0];
            practiseName  = practiseName.replace(/[^a-zA-Z ]/g, "").trim();
            practiceSubDetails = getSpecficAddress(place.address_components)
          }
          
          // Loop through the address components of the place to find the street address, city, zip code, and phone number
          place.address_components.forEach(function(component) {
            if (component.types.includes('street_number')) {
              streetAddress += component.long_name + ' ';
            }
            if (component.types.includes('route')) {
              streetAddress += component.long_name;
            }
            if (component.types.includes('locality')) {
              city = component.long_name;
            }
            if (component.types.includes('postal_code')) {
              zip = component.long_name;
            }
    
            if(component.types.includes('administrative_area_level_1')){
              state = component.short_name;
            }
    
          });
    
          let address = streetAddress + '|' + city + '|' + zip + '|' + phone + '|' + state + '|' + typedEmail + '|' + practiseName + "|" + website + "|" + (practiceSubDetails ?? '');
          (window as any)._this.sharedService.practiceAddress = address;
          (window as any)._this.processMatchPracticeDetails(practiseName,state);
        });
    }
    function getSpecficAddress(addressComponents) {
      for (let i = 0; i < addressComponents.length; i++) {
          const component = addressComponents[i];
          if (component.types && component.types.includes("subpremise")) {
              return component.long_name || null;
          }
      }
      return null;
  }
  }

  // Getter function to easily access form controls
  get formControls() {
    return this.matchPracticeForm.controls
  }
      
  // Getter function to easily access form controls
  get formControl() {
    return this.matchPracticeForm
  }

 async processMatchPracticeDetails(practiseName:any,state:any){
    if(this.sharedService.practiceAddress){
      let payload:any = {
        emailId: this.sharedService.generateUUID(),
        emailName: this.matchPracticeForm.get('email')?.value,
        practiceName: practiseName?.trim(),
        stateName: state?.trim()
      };
      let result = await this.matchPracticeService.checkMatchPractice(payload);
      if(result?.response){
      this.foundPractice = true;
      this.sharedService.userData = result.response;
  }
  else this.foundPractice = false;

  setTimeout(() => this.practiceNameInput.nativeElement.focus(),50);
  }
}

 setClickableValue(value:boolean){
  this.isClickable = value
 }

  navigate(){  
    if(this.foundPractice == true || this.foundPractice == false){
    let route:string =  'home/' + (this.foundPractice ? RoutePaths.SubmittingDoctor : RoutePaths.Registration);
    this.router.navigate([route]);
    }
  }

  forcelyNavigateToPractice(){
    this.foundPractice = false;
    this.navigate();
  }

} 
