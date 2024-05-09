import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { HttpClient } from '@angular/common/http';
import { StaysService } from 'src/app/services/stays.service';
import { StayItem } from 'src/app/models/stay-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router, private http: HttpClient, private staysService: StaysService
  ){
  }

  async goRegister() {
    await this.router.navigate(['/register'])
  }

  email: string = '';
  password: string = '';

  isFormFilled(): boolean {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }

  login(): void {
    if (this.isFormFilled()) {
      this.http.post<AuthResponse>(`http://localhost:5098/api/auth/login`, {
        email: this.email,
        password: this.password,
      })
        .subscribe((token) => console.log(token));
    } else {
      console.log('Пожалуйста, заполните все поля');
    }
  }

  loginBoxHidden: boolean = true;

  toggleLoginBox(): void {
    this.loginBoxHidden = !this.loginBoxHidden;
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      this.loginBoxHidden ? overlay.classList.add('hidden') : overlay.classList.remove('hidden');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Проверяем, был ли клик вне модального окна
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.login-box') && !targetElement.closest('.login')) {
      this.loginBoxHidden = true;
    }
  }
}
