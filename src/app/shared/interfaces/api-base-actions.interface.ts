import {Observable} from 'rxjs';
import {ApiBaseResponse} from './api-base-response.interface';

export type ParamsType = { hideLoader?: boolean,retry?:boolean }

export interface IApiBaseActions {
  Get(url: string, params?: ParamsType): Observable<ApiBaseResponse>;

  Post(url: string, data: any, params?: ParamsType): Observable<ApiBaseResponse>;

  Delete(url: string, data?: any, params?: ParamsType): Observable<ApiBaseResponse>;

  Put(url: string, data: any, params?: ParamsType): Observable<ApiBaseResponse>;

  Patch(url: string, data: any, params?: ParamsType): Observable<ApiBaseResponse>;
}
