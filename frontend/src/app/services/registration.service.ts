import { Injectable } from '@angular/core';
import { EndpointURLS } from '../global';
import { environment } from '../../environments/environment';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private apiService: ApiHandlerService) { }

  saveRegistration(payload) {
    return this.apiService.Post(environment.api_url + EndpointURLS.Registration,payload).toPromise();
}
}
