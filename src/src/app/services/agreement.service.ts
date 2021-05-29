import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { Advertisement } from '../models/advertisement';
import { Agreement } from '../models/agreement';

const API_URL = environment.webApiUrl + '/agreements';

@Injectable({
  providedIn: 'root',
})
export class AgreementService extends BaseService<Agreement> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
