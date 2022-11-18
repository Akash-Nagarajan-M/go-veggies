import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http:HttpClient) { }
  addOrders(orders:any):Observable<any>{
      const options=new HttpHeaders({'content-type':'application/json'});
      return this.http.post('http://localhost:3000/addOrders',orders.order,{headers:options}).pipe();
  }
 
}
