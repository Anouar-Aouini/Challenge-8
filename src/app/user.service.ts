import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from './users/users.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersUrl: string = 'http://localhost:3000/users';
  constructor(public http: HttpClient) { }

  getUsers() {
    return this.http.get<Utilisateur[]>(this.usersUrl)
  }

  deleteUser(id:number) {
    const url = this.usersUrl + '/' + id;
    return this.http.delete(url)
  }
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  addUser(user: Utilisateur): Observable<Utilisateur>
  {
    return this.http.post<Utilisateur>(this.usersUrl, user, this.httpOptions)
  }

  updateUser(user: Utilisateur): Observable<Utilisateur>{
    return this.http.put<Utilisateur>(this.usersUrl+'/'+user.id,user,this.httpOptions)
  }

}
