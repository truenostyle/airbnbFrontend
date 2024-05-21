import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/models/auth-response.model';

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

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient, private fb: FormBuilder) { 
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
      this.http.post<AuthResponse>(`http://localhost:5098/api/auth/login/external`, {
        provider: user.provider,
        idToken: user.idToken,
      })
        .subscribe((token) => console.log(token));
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.http.post<AuthResponse>(`http://localhost:5098/api/auth/register`, {
        name: this.registerInfo.name,
        email: this.registerInfo.email,
        password: this.registerInfo.password,
        gender: this.registerInfo.gender,
        dateOfBirth: this.registerInfo.dateOfBirth,
        shareRegistrationData: this.registerInfo.shareRegistrationData
      })
        .subscribe((token) => console.log(token));
  
    }
    
  }
  
  
}
