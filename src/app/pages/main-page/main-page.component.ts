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
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [NativeDateAdapter], 
 
})
export class MainPageComponent {
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  dropdownOpen: boolean = false;
  dropdownOpen2: boolean = false;
  loginModal: boolean = false;
  filterModal: boolean = false;
  wishlistModal: boolean = false;
  selectedCity: string = ''; 

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


  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownGuests = document.querySelector('.dropdown-guests');
    const loginModal = document.querySelector('.login-box');
    const filterModal = document.querySelector('.filterModal');
    const wishlistModal = document.querySelector('.wishlist-add');
    if (dropdownMenu !== null) {
      if (!dropdownMenu.contains(event.target as Node)) {
        this.dropdownOpen = false;
      }
    }

    if (dropdownGuests !== null) {
      if (!dropdownGuests.contains(event.target as Node)) {
        this.dropdownOpen2 = false;
      }
    }
    
    if (loginModal !== null) {
      if (!loginModal.contains(event.target as Node)) {
        this.loginModal = false;
      }
    }
    
    if (filterModal !== null) {
      if (!filterModal.contains(event.target as Node)) {
        this.filterModal = false;
      }
    }

    if (wishlistModal !== null) {
      if (!wishlistModal.contains(event.target as Node)) {
        this.wishlistModal = false;
      }
    }

   
   
  }

  toggleDropdown() {
    setTimeout(() => {
      this.dropdownOpen = !this.dropdownOpen;
    }, 0);
  }
  
  toggleDropdown2() {
    setTimeout(() => {
      this.dropdownOpen2 = !this.dropdownOpen2;
    }, 0);
  }

  toggleLoginBox(): void {
    setTimeout(() => {
      this.loginModal = !this.loginModal;
    }, 0);
  }

  toggleFilterBox(): void {
    setTimeout(() => {
      this.filterModal = !this.filterModal;
    }, 0);
  }

  toggleWishlistBox(): void {
    setTimeout(() => {
      this.wishlistModal = !this.wishlistModal;
    }, 0);
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
      300: {
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
 

  

  selectCity(city: string) {
    this.selectedCity = city; // Устанавливаем значение выбранного города
  }




  ngOnInit(): void {
    
  }
}
