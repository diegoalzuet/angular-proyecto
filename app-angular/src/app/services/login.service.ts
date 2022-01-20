import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = environment.loginRestApi;
  private token: any = null;
  private user = '';
  private userName = '';
  private mail='';
  private role='';
  private gender='';

  constructor(private httpClient: HttpClient) { }

  validateCredentials(user: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>(this.urlLogin, { user, password })
      .pipe(
        map(response => {
          if (response.status === 'OK') {
            this.token = response.token;
            const decodedToken: any = jwt_decode(this.token);
            this.user = decodedToken?.user;
            this.userName = decodedToken?.username;
            this.mail = decodedToken?.mail;
            this.gender = decodedToken?.gender;
            this.role = decodedToken?.role;
            return true;
          } else {
            this.token = null;
            return false;
          }
        })
      )
  }
  getToken(): any {
    return this.token;
  }
  isUserLoggedIn() {
    return this.user !== '';
  }
  getUserInfo(): any {
    return {
      user: this.user,
      userName: this.userName,
      mail: this.mail,
      role: this.role
    }
  }

}
