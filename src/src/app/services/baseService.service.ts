import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingResult } from '../models/pagingResult';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseEntity } from '../models/baseEntity';

//const API_URL = environment.webApiUrl + '/projects';

@Injectable({
  providedIn: 'root',
})
export class BaseService<EntityType extends BaseEntity> {
  constructor(public http: HttpClient, public apiUrl: string) {}

  getPageResult(
    pageSize: number = 10,
    currentPage: number = 1,
    search: string = '',
    orderBy: string = ''
  ) {
    let params = new HttpParams();
    params = params.append('pageSize', pageSize + '');
    params = params.append('currentPage', currentPage + '');
    params = params.append('search', search);
    params = params.append('orderBy', orderBy);

    //console.log(API_URL);

    return this.http
      .get<PagingResult<EntityType>>(this.apiUrl + '/details', { params })
      .pipe(tap((x) => console.log(x)));
  }

  //   protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
  //       const headers = new HttpHeaders({
  //           Authorization: 'Bearer ' + this.authService.accessToken,
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json, text/plain, */*'
  //       });

  //       return { headers };
  //   }

  get(id: number): Observable<EntityType> {
    return this.http.get<EntityType>(`${this.apiUrl}/` + id);
  }

  getAll(): Observable<EntityType[]> {
    // return this.http.get<Project[]>(this.API_URL, this.requestHeaders);
    return this.http.get<EntityType[]>(this.apiUrl);
  }

  add(entity: EntityType): Observable<EntityType> {
    console.log(entity);
    return this.http.post<EntityType>(this.apiUrl, entity);
  }

  update(entity: EntityType): Observable<EntityType> {
    return this.http.put<EntityType>(`${this.apiUrl}/` + entity.id, entity);
  }

  delete(id: number): Observable<EntityType> {
    console.log(id);
    return this.http.delete<EntityType>(`${this.apiUrl}/` + id);
  }

  // getProducts(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = '') {
  //   const url = environment.webApiUrl + '/projects';

  //   return this.http.get(url, { params })
  //     .pipe(
  //       map((res: IProductResponse) => {
  //         return res;
  //       }),
  //       catchError(errorRes => {
  //         return throwError(errorRes);
  //       })
  //     );
  // }
}
