import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { environment } from '../../environments/environment';
import { EndpointURLS } from '../global';

@Injectable({
  providedIn: 'root'
})
export class SubmittingDoctorService {

  constructor(private apiService:ApiHandlerService) { }

  saveNewDoctor(payload:any){
    debugger
      return this.apiService.Post(environment.api_url + EndpointURLS.SaveDoctor,payload).toPromise();
  }
}