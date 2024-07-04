import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../../model/stock';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  private REST_API_SERVER = 'https://localhost:7211/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) { }

  public getStocks(): Observable<any>{
    const url=`${this.REST_API_SERVER}/stocks`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getProducts(): Observable<any>{
    const url=`${this.REST_API_SERVER}/Products`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
  
  public getProductsBySearchQuery(searchQuery: string): Observable<any>{
    const url=`${this.REST_API_SERVER}/Products/getProducts/` + searchQuery;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getProductById(id: any): Observable<any>{
    const url=`${this.REST_API_SERVER}/Products/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public deleteProduct(id: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Products/${id}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  public updateProduct(product: any): Observable<any>{
    const url=`${this.REST_API_SERVER}/Products/` + product.id;
    return this.httpClient.put<any>(url, product, this.httpOptions);
  }

  public updatePassword(user: any): Observable<any>{
    console.log("user: ", user);
    const url=`${this.REST_API_SERVER}/Users/ChangePassword/` + user.userId;
    return this.httpClient.put<any>(url, user, this.httpOptions);
  }

  public updatePerson(user: any): Observable<any>{
    const url=`${this.REST_API_SERVER}/Users/` + user.id;
    return this.httpClient.put<any>(url, user, this.httpOptions);
  }

  public getCategories(): Observable<any>{
    const url=`${this.REST_API_SERVER}/Categories`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public deleteCategory(id: any): Observable<any>{
    const url = `${this.REST_API_SERVER}/Categories/${id}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  public addProduct(body: any): Observable<any>{
    const url=`${this.REST_API_SERVER}/Products`;
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }

  public getProductsToCategory(categoryId: number): Observable<any>{
    const url=`${this.REST_API_SERVER}/Products/category/${categoryId}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public postStock(body: any): Observable<any>{
    const url=`${this.REST_API_SERVER}/stocks`;
    console.log('postStock= ', url);
    console.log('postStock: body', body);
    return this.httpClient.post<any>(url, body, this.httpOptions);
  }
  
  public updateStock(stockId: string, body: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockId}`;
    return this.httpClient.put<any>(url, body, this.httpOptions);
  }

  public deleteStock(stockId: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockId}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  public getStockDetails(stockId: string): Observable<Stock>{
    // return this.httpClient.get<Stock>(`/stocks/${stockId}`);
    const url=`${this.REST_API_SERVER}/stocks/${stockId}`;
    return this.httpClient.get<Stock>(url, this.httpOptions);
  }
}
