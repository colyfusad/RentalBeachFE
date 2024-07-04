import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../../../model/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalServiceService {
  private REST_API_SERVER = 'https://localhost:7211/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private httpClient: HttpClient) { }

  getRentalAll(){
    const url=`${this.REST_API_SERVER}/Rentals/getRental`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getRenTals(userId: any){
    const url=`${this.REST_API_SERVER}/Rentals/getRental/` + userId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public updateRental(rentalId: any, statusId: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/Rentals/${rentalId}/${statusId}`;
    console.log("url: ", url);
    const body = { statusId: statusId };
    return this.httpClient.put<any>(url, body, this.httpOptions);
  }

  getRentalStatusAfter(){
    const url=`${this.REST_API_SERVER}/RentalStatus/getRentalStatusAfter`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getRentalStatus(){
    const url=`${this.REST_API_SERVER}/RentalStatus`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  getRenTalIdByUserId(userId: any){
    const url=`${this.REST_API_SERVER}/Rentals/getRentalId/` + userId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  updateCart(rentalItem: any, rentalId: any){
    const url=`${this.REST_API_SERVER}/RentalItems/update/` +  rentalId;
    return this.httpClient.put<any>(url, rentalItem, this.httpOptions);
  }

  getRentalItems(retalId: any){
    const url=`${this.REST_API_SERVER}/RentalItems/GetRentalItems/` + retalId;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  availableCart(userId: any){
    const url=`${this.REST_API_SERVER}/Rentals/status/` + userId;
    return this.httpClient.get<boolean>(url, this.httpOptions);
  }

  addRental(rental: any){
    const url=`${this.REST_API_SERVER}/Rentals`;
    console.log("uuuu: ", url);
    return this.httpClient.post<any>(url, rental, this.httpOptions);
  }

  deleteRental(rentalId: any){
    const url = `${this.REST_API_SERVER}/Rentals/${rentalId}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  deleteRentalItemByRentalId(rentalId: any){
    const url = `${this.REST_API_SERVER}/RentalItems/delete/${rentalId}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  addRentalItem(rentalItem: any){
    const url=`${this.REST_API_SERVER}/RentalItems`;
    return this.httpClient.post<any>(url, rentalItem, this.httpOptions);
  }

  public confirmOrder(rental: any): Observable<any>{
    const url=`${this.REST_API_SERVER}/Rentals/update/` + rental.userId;
    return this.httpClient.put<any>(url, rental, this.httpOptions);
  }
}
