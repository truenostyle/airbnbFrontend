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
  currentEmail: string = '';
  
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

    this.currentUser$.subscribe(user => {
      if (user) {
        this.email = user.email; // Установка email после получения пользователя
      }
    });
  }

  getEmail(): string {
    return this.email || ''; // Возвращает email или пустую строку, если email не определен
  }

  truncateEmail(email: string | undefined, digit: number): string {
    if (!email) return ''; // обработка случая, когда email не определен
    return email.length > digit ? email.substring(0, digit) + '...' : email;
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
  const targetElement = event.target as HTMLElement;

  // Проверяем, был ли клик внутри dropdown-menu
  if (targetElement.closest('.dropdown-menu')) {
    return;
  }

  // Проверяем, был ли клик внутри login-box или login
  if (targetElement.closest('.login-box') || targetElement.closest('.login')) {
    return;
  }

  // Если клик был вне всех указанных областей, закрываем все модальные окна
  this.closeDropdown();
  this.closeLoginBox();
}


  toggleLoginBox(): void {
    setTimeout(() => {
      this.loginBoxHidden = false;
      console.log ("open");
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        this.loginBoxHidden
          ? overlay.classList.add('hidden')
          : overlay.classList.remove('hidden');
      }
    }, 0);
    
  }

  toggleDropdown(): void {
    setTimeout(() => {
      this.dropdownOpen = !this.dropdownOpen;
    }, 0);
  }

  closeLoginBox(): void {
  
    this.loginBoxHidden = true;
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }

  closeDropdown() {
    console.log("close");
      this.dropdownOpen = false;
  }

  logOut() {
    localStorage.removeItem('Authorization');
    window.location.reload();
  }
}
