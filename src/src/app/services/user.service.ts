import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { Advertisement } from '../models/advertisement';
import { Agreement } from '../models/agreement';
import { User } from '../models';

const API_URL = environment.webApiUrl + '/users';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
