import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/user'
  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url)
  }
    
  insertUser(u:User):Observable<any>{
    return this.http.post(this.url+'insertUser',u)
  }
  deleteUser(id:number):Observable<any>{
    return this.http.post(this.url+'/'+id+'/deleteUser',null)
  }
  updateUser(u:User):Observable<any>{
    return this.http.post(this.url+'/'+u.id+'/deleteUser',u)
  }
  setProduct(possessorId: number, catId: number): Observable<any> {
    return this.http.post(this.url + '/' + possessorId + '/setCat', catId)
  }

}
