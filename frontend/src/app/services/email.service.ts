import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { environment } from '../../environments/environment';
import { EndpointURLS } from '../global';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private apiService: ApiHandlerService) { }

  checkEmailMatchDB(email: string){
    return this.apiService.Get(environment.api_url+ EndpointURLS.CheckEmailDb+'?email='+email).toPromise();
}
}
