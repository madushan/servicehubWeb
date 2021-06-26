import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { Contact } from '../models';

const API_URL = environment.webApiUrl + '/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService<Contact> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
