import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  emailRelatedData: any = {};
  isInProgress = false;
  constructor() { }
}

export enum RoutePaths {
  EmailPage = 'email-page',
  SubmittingDoctor = 'submitting-doctor',
  MatchPractice = 'match-practice'
}
