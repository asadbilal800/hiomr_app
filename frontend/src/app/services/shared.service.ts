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

  //submitting doctor data:
  selectedDoctorId: string ='';
  newDoctorScenario =  false;
  newDoctorPayload = {} as any;

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

export const routePathHeaderPrecedence = {
  'email':1,
  'submitting-doctor':1,
  'match-practice':1,
  'registration':1,
  'patientForm':2,
  'reason':3,
  'radiologist':4,
  'confirmation':5
};

//states USA
// In your TypeScript component
export const StatesUSA: { value: string, name: string }[] = [
  { value: 'AL', name: 'AL' },
  { value: 'AK', name: 'AK' },
  { value: 'AR', name: 'AR' },
  { value: 'AZ', name: 'AZ' },
  { value: 'CA', name: 'CA' },
  { value: 'CO', name: 'CO' },
  { value: 'CT', name: 'CT' },
  { value: 'DC', name: 'DC' },
  { value: 'DE', name: 'DE' },
  { value: 'FL', name: 'FL' },
  { value: 'GA', name: 'GA' },
  { value: 'HI', name: 'HI' },
  { value: 'IA', name: 'IA' },
  { value: 'ID', name: 'ID' },
  { value: 'IL', name: 'IL' },
  { value: 'IN', name: 'IN' },
  { value: 'KS', name: 'KS' },
  { value: 'KY', name: 'KY' },
  { value: 'LA', name: 'LA' },
  { value: 'MA', name: 'MA' },
  { value: 'MD', name: 'MD' },
  { value: 'ME', name: 'ME' },
  { value: 'MI', name: 'MMI' },
  { value: 'MN', name: 'MMN' },
  { value: 'MO', name: 'MO' },
  { value: 'MS', name: 'MS' },
  { value: 'MT', name: 'MT' },
  { value: 'NC', name: 'NC' },
  { value: 'NE', name: 'NE' },
  { value: 'NH', name: 'NH' },
  { value: 'NJ', name: 'NNJ' },
  { value: 'NM', name: 'NM' },
  { value: 'NV', name: 'NV' },
  { value: 'NY', name: 'NY' },
  { value: 'ND', name: 'ND' },
  { value: 'OH', name: 'OH' },
  { value: 'OK', name: 'OK' },
  { value: 'OR', name: 'OR' },
  { value: 'PA', name: 'PA' },
  { value: 'RI', name: 'RI' },
  { value: 'SC', name: 'SC' },
  { value: 'SD', name: 'SD' },
  { value: 'TN', name: 'TTN' },
  { value: 'TX', name: 'TX' },
  { value: 'UT', name: 'UT' },
  { value: 'VT', name: 'VT' },
  { value: 'VA', name: 'VA' },
  { value: 'WA', name: 'WA' },
  { value: 'WI', name: 'WI' },
  { value: 'WV', name: 'WV' },
  { value: 'WY', name: 'WY' },
  { value: 'AS', name: 'American Samoa (AS)' },
  { value: 'GU', name: 'Guam (GU)' },
  { value: 'MP', name: 'Northern Mariana Islands (MP)' },
  { value: 'PR', name: 'Puerto Rico (PR)' },
  { value: 'UM', name: 'United States Minor Outlying Islands (UM)' },
  { value: 'VI', name: 'Virgin Islands (VI)' },
  { value: 'AA', name: 'Armed Forces Americas (AA)' },
  { value: 'AP', name: 'Armed Forces Pacific (AP)' },
  { value: 'AE', name: 'Armed Forces Others (AE)' }
];

export const SpecialityDD: { value: string, name: string }[] = [
  { value: '1', name: 'General' },
  { value: '2', name: 'Endodontics' },
  { value: '3', name: 'Periodontics' },
  { value: '4', name: 'Prosthodontics' },
  { value: '5', name: 'Orthodontics' },
  { value: '6', name: 'Pediatrics' },
  { value: '7', name: 'OMS' },
  { value: '8', name: 'Pathology' },
  { value: '9', name: 'Other' },
];

export const CBCTDD: { value: string, name: string }[] = [
  { value: '1', name: 'Sirona' },
  { value: '2', name: 'iCat' },
  { value: '3', name: 'Carestream Kodak' },
  { value: '4', name: 'Planmeca' },
  { value: '5', name: 'Instrumentarium' },
  { value: '6', name: 'Morita' },
  { value: '7', name: 'VaTech' },
  { value: '8', name: 'NewTom' },
  { value: '9', name: 'PreXion' },
  { value: '10', name: 'Kavo' },
  { value: '11', name: 'Dexis' },
  { value: '99', name: 'Other' },

];