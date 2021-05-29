import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { PagingResult } from '../models/pagingResult';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';

const API_URL = environment.webApiUrl + '/clients';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService<Client> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
