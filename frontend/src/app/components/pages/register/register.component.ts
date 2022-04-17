import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;

  constructor(private registerService: RegisterService, private route: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.min(6),
      ]),
    });
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get firstName() {
    return this.registerForm.get('firstName')!;
  }

  get lastName() {
    return this.registerForm.get('lastName')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  async submit() {
    if (this.registerForm.status === 'INVALID') return;
    this.loading = true;
    const res = await this.registerService.register(this.registerForm.value);
    //fake loading hehe
    setTimeout(() => {
      this.loading = false;
      if (res?.token) {
        this.route.navigate(['dashboard']);
      }
    }, 500);
  }
}
