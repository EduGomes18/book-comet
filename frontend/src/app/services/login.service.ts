import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiUrl = environment.baseUrl;
  private apiUrl = `${this.baseApiUrl}auth`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  async auth(user: User) {
    const response = await this.http
      .post<User>(this.apiUrl, user)
      .toPromise()
      .catch((err) => {
        if (err?.error?.message) this.toastr.error(err.error.message);
        else this.toastr.error('Error conecting with server, try again later.');
      });
    const json = JSON.stringify(response);
    localStorage.setItem('user', json);
    return response;
  }

  IsLogged() {
    return localStorage.getItem('user') != null;
  }

  userInfo() {
    if (localStorage.getItem('user') !== null) {
      const getUser = JSON.parse(localStorage.getItem('user') || '');

      return getUser;
    } else return null;
  }
}
