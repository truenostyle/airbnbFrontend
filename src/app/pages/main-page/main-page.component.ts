import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { HttpClient } from '@angular/common/http';
import { StaysService } from 'src/app/services/stays.service';
import { StayItem } from 'src/app/models/stay-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  items: Observable<StayItem[]>;
  constructor(
    private router: Router, private http: HttpClient, private staysService: StaysService
  ){
    this.items = staysService.getStays();
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

  filterBoxHidden: boolean = true;
  toggleFilterBox(): void {
    this.filterBoxHidden = !this.filterBoxHidden;
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      this.filterBoxHidden? overlay.classList.add('hidden') : overlay.classList.remove('hidden');
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
      700: {
        items: 6
      },
      1000: {
        items: 12
      }
    }
  };


  activeButtonIndex: number = 1; // По умолчанию первая кнопка активна
  bedroomsActiveButtonIndex: number = 1;
  bedsActiveButtonIndex: number = 1;
  bathroomsActiveButtonIndex: number = 1;


  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }

  bedroomsSetActiveButton(index: number): void {
    this.bedroomsActiveButtonIndex = index;
  }

  bedsSetActiveButton(index: number): void {
    this.bedsActiveButtonIndex = index;
  }

  bathroomsSetActiveButton(index: number): void {
    this.bathroomsActiveButtonIndex = index;
  }
  
  clearAll() {
    this.bathroomsActiveButtonIndex = 1;
    this.bedsActiveButtonIndex = 1;
    this.bedroomsActiveButtonIndex = 1;
    this.activeButtonIndex = 1;
    console.log("text");
  }
  

  ngOnInit(): void {
    
  }
}
