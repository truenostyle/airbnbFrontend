import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { UserInfo } from 'src/app/models/user-info.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss'],
})
export class SecondHeaderComponent implements OnInit {
  dropdownOpen: boolean = false;
  currentUser$: Observable<UserInfo | undefined>;
  email: string = '';
  password: string = '';
  loginBoxHidden: boolean = true;

  constructor(
    private elementRef: ElementRef,
    usersService: UserService,
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.currentUser$ = usersService.currentUser$;
  }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.http
        .post<AuthResponse>(environment.apiUrl + `/api/auth/login/external`, {
          provider: user.provider,
          idToken: user.idToken,
        })
        .subscribe((result) => {
          localStorage.setItem('Authorization', result.token);
          window.location.reload();
        });
    });
  }

  toggleLoginBox(): void {
    this.loginBoxHidden = !this.loginBoxHidden;
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      this.loginBoxHidden
        ? overlay.classList.add('hidden')
        : overlay.classList.remove('hidden');
    }
  }

  isFormFilled(): boolean {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }

  login(): void {
    if (this.isFormFilled()) {
      this.http
        .post<AuthResponse>(environment.apiUrl + `/api/auth/login`, {
          email: this.email,
          password: this.password,
        })
        .subscribe((result) => {
          localStorage.setItem('Authorization', result.token);
          window.location.reload();
        });
    } else {
      console.log('Пожалуйста, заполните все поля');
    }
  }

  async goRegister() {
    await this.router.navigate(['/register']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Проверяем, был ли клик вне модального окна
    const targetElement = event.target as HTMLElement;
    if (
      !targetElement.closest('.login-box') &&
      !targetElement.closest('.login')
    ) {
      this.loginBoxHidden = true;
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logOut() {
    localStorage.removeItem('Authorization');
    window.location.reload();
  }
}
