import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IApiBaseActions, ParamsType } from '../interfaces/api-base-actions.interface';
import { ApiBaseResponse } from '../interfaces/api-base-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService implements IApiBaseActions {
  constructor(public httpClient: HttpClient) {
  }

  Get(url: string, params?: ParamsType) {
    return this.httpClient
      .get<ApiBaseResponse>(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Post(url: string, data: any, params?: ParamsType,headers?:any) {
    return this.httpClient
      .post<ApiBaseResponse>(url, data, {params: this.createParams(params),headers:headers})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Delete(url: string, data:any, params?: ParamsType) {
    return this.httpClient
      .delete<ApiBaseResponse>(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Put(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .put<ApiBaseResponse>(url, data, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Patch(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .patch<ApiBaseResponse>(url, data, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  HandleResponse(response: any) {
    if (response?.Status === 500) {
      alert('Server error 500')
    }
  }

  createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }

}

