import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PagingResult } from '../models/pagingResult';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { StateChangeDTO } from './../models/dto/stateChangeDTO';

const API_URL = environment.webApiUrl + '/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<Project> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }

  changeStatus(id, status, statusChngeDate) {
    // let change = new StateChangeDTO();
    // let obj = {id,status};
    console.log(API_URL + '/changestatus');
    return this.http
      .post(API_URL + '/changestatus', { id, status, statusChngeDate })
      .pipe(tap(console.log));
  }
}
