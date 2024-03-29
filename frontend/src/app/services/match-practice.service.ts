import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { environment } from '../../environments/environment';
import { EndpointURLS } from '../global';

@Injectable({
  providedIn: 'root'
})
export class MatchPracticeService {

  constructor(private apiService: ApiHandlerService) { }

  
  checkMatchPractice(payload) {
    return this.apiService.Post(environment.api_url + EndpointURLS.MatchPracticeDb,payload).toPromise();
}

}
