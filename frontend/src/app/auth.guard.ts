import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService, private route: Router) {

  }

  canActivate() {
    if (this.service.IsLogged()) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }
  
}
