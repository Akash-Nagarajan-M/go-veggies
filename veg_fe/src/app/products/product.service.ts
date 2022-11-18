import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

import { Product } from './product';

@Injectable()
export class ProductService {

    selectedProducts: any = [];
    products: any = [];
    producttype='vegetable';
    username: string = '';


    // Fetches selectedProducts data from the sessionStorage
    constructor(private http: HttpClient) {
        if (sessionStorage.getItem('selectedProducts')) {
            this.selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts') + '');
        }
    }

    // Makes a get request to backend to fetch products data
    getProducts(): Observable<Product[]> {
        if(this.producttype==='all'){
            return this.http.get<Product[]>('http://localhost:3000/getAll').pipe(
                tap((products) => this.products= products ),
                catchError(this.handleError));
            
        }
        if (this.producttype === 'vegetable') {
            return this.http.get<Product[]>('http://localhost:3000/getVegetables').pipe(
                tap((products) => this.products = products),
                catchError(this.handleError));
        } else if (this.producttype === 'fruit') {
            return this.http.get<Product[]>('http://localhost:3000/getFruits').pipe(
                tap((products) => this.products = products),
                catchError(this.handleError));
        }
        else
         throw new Error();
    }

    // Fetches the selected product details
    getProduct(id: number): Observable<Product> {
        return this.getProducts().pipe(
            map(products => products.filter(product => product.productId === id)[0]));
    }

    // Error Handling code
    private handleError(err: HttpErrorResponse) {
        return throwError(() => err.error() || 'Server error');
    }
}
