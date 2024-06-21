import { Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  emailRelatedData: any = {};
  userData: any = {};
  isInProgress = false;
  practiceAddress:any;
  matchPracticeData: any = null as any;

  //submitting doctor data:
  selectedDoctorId: string ='';
  newDoctorScenario =  false;

  //patient related shared data:
  patientInfoValues: any;
  reasonInfoValues: any;
  radiologistValues: any;

  //disabled reason
  reasonDisabled = false;

  //dbSavedDataOnSubmut
  dbSavedData = {} as any;

  //shared global variable
  stripe:Stripe;
  stripeCustomerId:any;


  reasonArray =  [
    {code: 1, name: "implant", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 3, name: "tmj", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 4, name: "pathology", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 5, name: "endodontic", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 6, name: "surgical", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 7, name: "airway", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 8, name: "systemic", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 9, name: "other", isOverread: false, desc:"" , isDisable: false,checked: false},
    {code: 99, name: "ovveread", isOverread: true, desc:"" , isDisable: false,checked: false}
  ];

  constructor() { 
  }

  async initStripe(){
    this.stripe = await loadStripe(environment.publishableStripeKey);
  }
   generateUUID() {
    const ho = (n, p) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
    const data = crypto.getRandomValues(new Uint8Array(16)); /// Fill the buffer with random data
    data[6] = (data[6] & 0xf) | 0x40; /// Patch the 6th byte to reflect a version 4 UUID
    data[8] = (data[8] & 0x3f) | 0x80; /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
    const view = new DataView(data.buffer); /// Create a view backed by a 16-byte buffer
    return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
};
}

export enum RoutePaths {
  EmailPage = 'email',
  SubmittingDoctor = 'submitting-doctor',
  MatchPractice = 'match-practice',
  Registration = 'registration',
  PatientForm = 'patientForm',
  Reason = 'reason',
  Radiologist = 'radiologist',
  Confirmation ='confirmation'
}
