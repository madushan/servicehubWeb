import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { Payment } from '../models/payment';

const API_URL = environment.webApiUrl + '/payments';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService<Payment> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
