import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/product'
  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url)
  }
  insertProduct(p:Product):Observable<any>{
    return this.http.post(this.url+'insertProduct',p)
  }
  deleteProduct(id:number):Observable<any>{
  return this.http.post(this.url+'/'+id+'/deleteProduct',null)
  }
  updateProduct(p:Product):Observable<any>{
  return this.http.post(this.url+'/'+p.id+'/updateProduct',p)
  }
  
}
