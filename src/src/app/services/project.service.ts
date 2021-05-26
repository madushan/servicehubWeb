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
  providedIn: 'root'
})
export class ProjectService extends BaseService<Project> {

  constructor(public http:HttpClient) { 
      super(http,API_URL);
  }

//   getProjects(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''){
//     let params = new HttpParams();
//     params = params.append('pageSize', pageSize + '');
//     params = params.append('currentPage', currentPage + '');
//     params = params.append('search', search);
//     params = params.append('orderBy', orderBy);

    
//     console.log(API_URL);

//     return this.http.get<PagingResult<Project>>(API_URL + '/details',{params}).pipe(tap( x => console.log(x)));
//   }

//   protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
//       const headers = new HttpHeaders({
//           Authorization: 'Bearer ' + this.authService.accessToken,
//           'Content-Type': 'application/json',
//           Accept: 'application/json, text/plain, */*'
//       });

//       return { headers };
//   }

    // get(id: number): Observable<Project> {
    //     return this.http.get<Project>(`${API_URL}/`+id);
    // }

    // getAll(): Observable<Project[]> {
    //     // return this.http.get<Project[]>(this.API_URL, this.requestHeaders);
    //     return this.http.get<Project[]>(API_URL);
    // }

    // add(project: Project): Observable<Project> {
    //     console.log("add address");
    //     return this.http.post<Project>(API_URL, project);
    // }

    // update(project: Project): Observable<Project> {
    //     return this.http.put<Project>(`${API_URL}/` + project.id, project);
    // }

    // delete(id: number): Observable<Project> {
    //     return this.http.delete<Project>(`${API_URL}/` + id);
    // }

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
