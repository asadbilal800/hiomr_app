import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { environment } from '../../environments/environment';
import { EndpointURLS } from '../global';

@Injectable({
  providedIn: 'root'
})
export class MatchPracticeService {

  constructor(private apiService: ApiHandlerService) { }

  
  checkMatchPractice(email: string){
    return this.apiService.Get(environment.api_url+ EndpointURLS.MatchPracticeDb+'?email='+email).toPromise();
}
}
