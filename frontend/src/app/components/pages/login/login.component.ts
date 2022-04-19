import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(private loginService: LoginService, private route: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.min(6)]),
    });
  }

  get email() {
    return this.loginForm.get("email")!;
  }

  get password() {
    return this.loginForm.get("password")!;
  }

  async submit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const res = await this.loginService.auth(this.loginForm.value);

    //fake loading hehe
    setTimeout(() => {
      this.loading = false;
      if (res?.token) {
        this.route.navigate(["dashboard"]);
      }
    }, 500);
  }
}
