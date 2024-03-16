import { Component,HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../models/auth-response.model';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListItem } from '../../models/list-item.model';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, GoogleSigninButtonModule,CarouselModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  
})
export class MainComponent  {


  items: ListItem[] = [];
  constructor(
    private router: Router, private http: HttpClient
  ){

    for (let i = 0; i < 100; i++) {
      this.items.push({
        imageUrl: 'https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_1200x780_mobile_3.jpeg',
        name: 'Grovland, California',
        starImageUrl: '../assets/star.svg',
        rating: 4.91,
        place: 'Yosemite National Park',
        time: 'Oct 23 - 28',
        price: 289
      });
    }
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

  

  options = [
    { value: 1, label: 'USD' },
    { value: 2, label: 'EUR' },
    { value: 3, label: 'UAH' }
  ];

  count: number = 1; // Начальное значение счетчика

  increment(): void {
    this.count++; // Увеличиваем счетчик на 1
  }

  decrement(): void {
    if (this.count > 1) { // Проверяем, что счетчик больше 1
      this.count--; // Уменьшаем счетчик на 1
    }
  }
 
  
  customOptions: any = {
    loop: true,
    margin: 5,
    nav: false,
    navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 4
      },
      1200: {
        items: 12
      }
    }
  };
  ngOnInit(): void {
  }
}
