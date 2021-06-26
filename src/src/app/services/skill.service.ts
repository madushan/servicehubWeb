import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { Advertisement } from '../models/advertisement';
import { Agreement } from '../models/agreement';
import { Skill } from '../models';

const API_URL = environment.webApiUrl + '/skills';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends BaseService<Skill> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
