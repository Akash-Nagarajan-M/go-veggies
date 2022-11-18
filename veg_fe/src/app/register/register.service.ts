import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from './register';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  
  getRegisters(): Observable<Register[]> {
    return this.http.get<Register[]>('http://localhost:3000/getRegisters').pipe(catchError(this.handleError)  );
  }
  addUsers(regist:any):Observable<any>{
      const options=new HttpHeaders({'content-type':'application/json'});
      return this.http.post('http://localhost:3000/addRegisters',regist,{headers:options}).pipe();
    }
 

private handleError(err: HttpErrorResponse) {
    console.error(err);
    return throwError(()=>err.error() || 'Server error');
}
}
