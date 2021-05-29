import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PagingResult } from '../models/pagingResult';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';

const API_URL = environment.webApiUrl + '/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<Project> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }
}
