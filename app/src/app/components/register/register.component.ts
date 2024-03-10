import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthResponse } from '../../models/auth-response.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [GoogleSigninButtonModule, HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerInfo = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 0,
    dateOfBirth: "2024-03-03T14:43:17.350Z",
    shareRegistrationData: false
  }

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient) { }

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