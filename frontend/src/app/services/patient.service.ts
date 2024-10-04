import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { environment } from '../../environments/environment';
import { EndpointURLS } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private apiService: ApiHandlerService) { }

  savePatient(payload) {
    return this.apiService.Post(environment.api_url + EndpointURLS.PatientInfo,payload).toPromise();
}

uploadFiles(payload) {
  return this.apiService.Post(environment.api_url + EndpointURLS.UploadFiles,payload).toPromise();
}


async makeBucket(pracitceId){
  return await this.apiService.Get(`${environment.api_url}${EndpointURLS.MakeBucket}?practiceId=${pracitceId}`).toPromise();
}

async uploadToBcuket(pracitceId,patientId){
  return await this.apiService.Get(`${environment.api_url}${EndpointURLS.uploadToBucket}?practiceId=${pracitceId}&patientId=${patientId}`).toPromise();
}

}
