import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { LoginService } from "../services/login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isLoggedIn = this.loginService.IsLogged();

    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isLoggedIn && isApiUrl) {
      const getToken = JSON.parse(localStorage.getItem("user") || "");

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${getToken.token}` },
      });
    }

    return next.handle(request);
  }
}
