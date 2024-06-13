import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerInfo = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 0,
    dateOfBirth: "2024-03-03T14:43:17.350Z",
    shareRegistrationData: false
  }
  registerForm: FormGroup;

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient, private fb: FormBuilder, private router: Router) { 
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }




  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['repeatPassword'].value
      ? null : { mismatch: true };
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repeatPassword() { return this.registerForm.get('repeatPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }

  onSubmit() {
    if (this.registerForm.valid) {
      // обработка формы
    }
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.http.post<AuthResponse>(environment.apiUrl + `/api/auth/login/external`, {
        provider: user.provider,
        idToken: user.idToken,
      })
      .subscribe((result) => localStorage.setItem("Authorization", result.token));
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.http.post<AuthResponse>(environment.apiUrl + `/api/auth/register`, {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        gender: this.registerForm.get('gender')?.value,
        dateOfBirth: this.registerForm.get('dateOfBirth')?.value,
        shareRegistrationData: this.registerForm.get('shareRegistrationData')?.value
      })
      .subscribe((result) => { 
        localStorage.setItem("Authorization", result.token)
        this.router.navigate(['']);
      });
    }
  }
}
