import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './common/user.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
    this.http = http;

  }
  public checkCredentials(username, password) {
    if (username == 'admin@gmail.com' && password == 'admin') {
      let user = new User();
      user.username = username;
      user.password = password;
      user.firstName = "Rajesh";
      user.lastName = "Agrawal";
      user.token = "7298379281";
      return user;
    }
    return null;
  }
  public getDate() {

    return "10-Jan-2021";
  }
}
