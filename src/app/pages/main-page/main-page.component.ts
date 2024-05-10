import { AfterViewInit, Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response.model';
import { HttpClient } from '@angular/common/http';
import { StaysService } from 'src/app/services/stays.service';
import { StayItem } from 'src/app/models/stay-item.model';
import { Observable } from 'rxjs';
import { NativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StayFilter } from 'src/app/models/stay-filter.model';
import { RoomType } from 'src/app/enums/room-type.enum';
import { WhishlistsService } from 'src/app/services/whishlists.service';
import { WhishlistCategory } from 'src/app/models/whistlist-category.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [NativeDateAdapter], 
})
export class MainPageComponent {
  RoomType = RoomType;
  items?: Observable<StayItem[]>;
  filters = new StayFilter;
  whishlistCategories?: Observable<WhishlistCategory[]>;
  constructor(
    private router: Router, private http: HttpClient, private staysService: StaysService, private elementRef: ElementRef, private whishlistsService: WhishlistsService
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

  count: number = 0; // Начальное значение счетчика

  increment(): void {
    this.filters.minGuests++; // Увеличиваем счетчик на 1
  }

  decrement(): void {
    if (this.filters.minGuests > 1) { // Проверяем, что счетчик больше 1
      this.filters.minGuests--; // Уменьшаем счетчик на 1
    }
  }

  adults_count: number = 0; // Начальное значение счетчика взрослых
  children_count: number = 0;
  infants_count: number = 0;
  pets_count: number = 0; // Начальное значение счетчика детей

  // Функция для увеличения счетчика
  incrementCounter(counter: string): void {
    if (counter === 'adults') {
      this.adults_count++;
    } else if (counter === 'children') {
      this.children_count++;
    } else if (counter === 'infants') {
      this.infants_count++;
    } else if (counter === 'pets') {
      this.pets_count++;
    }
    this.resultCount(this.adults_count, this.children_count, this.infants_count, this.pets_count )
  }

  // Функция для уменьшения счетчика
  decrementCounter(counter: string): void {
    if (counter === 'adults' && this.adults_count > 0) {
      this.adults_count--;
    } else if (counter === 'children' && this.children_count > 0) {
      this.children_count--;
    } else if (counter === 'infants' && this.infants_count > 0) {
      this.infants_count--;
    } else if (counter === 'pets' && this.pets_count > 0) {
      this.pets_count--;
    }
    this.resultCount(this.adults_count, this.children_count, this.infants_count, this.pets_count )
  }

  resultCount(adults: number, children: number, infants: number, pets: number) {
    this.count = adults + children + infants + pets;
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
 

  dropdownOpen: boolean = false;
  dropdownOpen2: boolean = false;
  selectedCity: string = ''; // Переменная для хранения выбранного города

  toggleDropdown() {
    this.dropdownOpen = true;
    if ( this.dropdownOpen2 != false) 
      {
        this.dropdownOpen2 = false;
      }
   
  }
  
  toggleDropdown2() {
    this.dropdownOpen2 = true;
    if ( this.dropdownOpen != false) 
      {
        this.dropdownOpen = false;
      }
  }

  selectCity(city: string) {
    this.selectedCity = city; // Устанавливаем значение выбранного города
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
    this.dropdownOpen2 = false;
  }


  ngOnInit(): void {
    
  }
}
