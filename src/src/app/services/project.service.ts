import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  getProjects(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''){
    let params = new HttpParams();
    params = params.append('pageSize', pageSize + '');
    params = params.append('currentPage', currentPage + '');
    params = params.append('search', search);
    params = params.append('orderBy', orderBy);

    let url = environment.webApiUrl + '/projects';
    console.log(url);

    return this.http.get<any>(url,{params}).pipe(tap( x => console.log(x)));
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
