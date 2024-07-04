import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private REST_API_SERVER = 'https://localhost:7211/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<any>{
    const url=`${this.REST_API_SERVER}/Categories`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
