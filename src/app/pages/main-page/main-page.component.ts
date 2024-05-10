import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { HttpClient } from '@angular/common/http';
import { StaysService } from 'src/app/services/stays.service';
import { StayItem } from 'src/app/models/stay-item.model';
import { Observable } from 'rxjs';
import { StayFilter } from 'src/app/models/stay-filter.model';
import { RoomType } from 'src/app/enums/room-type.enum';
import { WhishlistsService } from 'src/app/services/whishlists.service';
import { WhishlistCategory } from 'src/app/models/whistlist-category.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  RoomType = RoomType;
  items?: Observable<StayItem[]>;
  filters = new StayFilter;
  whishlistCategories?: Observable<WhishlistCategory[]>;
  constructor(
    private router: Router, private http: HttpClient, private staysService: StaysService, private whishlistsService: WhishlistsService
  ){
    this.refreshWhishlistCategories()
    this.refreshStays();
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
        .subscribe((result) => localStorage.setItem("Authorization", result.token));
    } else {
      console.log('Пожалуйста, заполните все поля');
    }
  }

  toggleAllBoxes(): void {
    this.loginBoxHidden = true;
    this.filterBoxHidden = true;
    this.wishlistBoxHidden = true;

    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.add('hidden');
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

  wishlistBoxHidden: boolean = true;
  toggleWishlistBox(): void {
    console.log('test')
    this.wishlistBoxHidden = !this.wishlistBoxHidden;
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      this.wishlistBoxHidden? overlay.classList.add('hidden') : overlay.classList.remove('hidden');
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

  increment(): void {
    this.filters.minGuests++; // Увеличиваем счетчик на 1
  }

  decrement(): void {
    if (this.filters.minGuests > 1) { // Проверяем, что счетчик больше 1
      this.filters.minGuests--; // Уменьшаем счетчик на 1
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


  setActiveButton(index: number): void {
    this.filters.roomType = index;
  }

  bedroomsSetActiveButton(index: number): void {
    this.filters.minBedrooms = index;
  }

  bedsSetActiveButton(index: number): void {
    this.filters.minBeds = index;
  }

  bathroomsSetActiveButton(index: number): void {
    this.filters.minBathrooms = index;
  }
  
  clearAll() {
    this.filters.minBathrooms = 0;
    this.filters.minBeds = 0;
    this.filters.minBedrooms = 0;
    this.filters.roomType = RoomType.Any;
  }

  refreshStays() {
    this.items = this.staysService.getStays(this.filters);
  }

  refreshWhishlistCategories() {
    this.whishlistCategories = this.whishlistsService.get()
  }

  addWhishlistCategory() {
    this.whishlistsService.add("New category").subscribe(() => this.refreshWhishlistCategories());
  }
  

  ngOnInit(): void {
    
  }
}
