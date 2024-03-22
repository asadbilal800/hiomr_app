import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  emailRelatedData: any = {};
  userData: any = {};
  isInProgress = false;
  constructor() { }
}

export enum RoutePaths {
  EmailPage = 'email',
  SubmittingDoctor = 'submitting-doctor',
  MatchPractice = 'match-practice'
}
