import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';
import { Bid } from '../models';

const API_URL = environment.webApiUrl + '/bids';

@Injectable({
  providedIn: 'root',
})
export class BidService extends BaseService<Bid> {
  constructor(public http: HttpClient) {
    super(http, API_URL);
  }

  getBidByProjectAndUser(projectId){
    return this.http.get<Bid>(API_URL + '/getbid/'+projectId)
      .pipe(
        tap(console.log)
      )
  }

  getBidsByProject(projectId){
    return this.http.get<Bid[]>(API_URL + '/getbids/'+projectId)
      .pipe(
        tap(console.log)
      )
  }
}
