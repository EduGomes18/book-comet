import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { User } from "../interfaces/User";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private baseApiUrl = environment.baseUrl;
  private apiUrl = `${this.baseApiUrl}auth/register`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  async register(user: User) {
    const response = <any>await this.http
      .post(this.apiUrl, user)
      .toPromise()
      .catch((err) => {
        if (err.error.message) this.toastr.error(err.error.message);
        else this.toastr.error("Error conecting with server, try again later.");
      });

    if (response) {
      const json = JSON.stringify(response);
      localStorage.setItem("user", json);
    }

    return response;
  }
}
