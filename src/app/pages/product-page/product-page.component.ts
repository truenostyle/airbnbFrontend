import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  range: FormGroup;
  count: number = 0;
  cost: number = 0;
  isAvailable: boolean = false;
  dropdownOpen2: boolean = false;

  adults_count: number = 0; // Начальное значение счетчика взрослых
  children_count: number = 0;
  infants_count: number = 0;
  pets_count: number = 0; // Начальное значение счетчика детей


  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private router: Router
  ) {
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    });
  }

  
 

  checkConditions(): boolean {
    const start = this.range.controls['start'].value;
    const end = this.range.controls['end'].value;
    if(start && end && this.count > 0) 
      {
        return true;
      }
      else return false;
  }

  onSubmit(): void {
    if (this.checkConditions()) {
      this.calculateCost();
      
      if (this.isRequestToBook()) {
        this.saveState();
      }
      this.isAvailable = true;
    } else {
      this.isAvailable = false;
    }
  }
  
  isRequestToBook(): boolean {
    return this.isAvailable && this.btnLabel === 'Request to book';
  }
  
  get btnLabel(): string {
    return this.isAvailable ? 'Request to book' : 'Check availability';
  }
  
  saveState(): void {
    this.stateService.changeDateRange(this.range.controls['start'].value, this.range.controls['end'].value);
    this.stateService.changeGuestCount(this.count); 
    this.stateService.changeCost(this.cost);
    this.router.navigate(['/booking']);
  }

  calculateCost(): void {
    const start = this.range.controls['start'].value;
    const end = this.range.controls['end'].value;
    const oneDay = 24 * 60 * 60 * 1000;
    if (end !== null && start !== null) {
      const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
      const pricePerNight = 500;
      this.cost = diffDays * pricePerNight;
    }
  }

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownMenu = document.querySelector('.dropdown-guests');
    
    if (dropdownMenu !== null) {
      if (!dropdownMenu.contains(event.target as Node)) {

        this.dropdownOpen2 = false;
      }
    }
  }
  toggleDropdown2() {
    setTimeout(() => {
      this.dropdownOpen2 = !this.dropdownOpen2;
    }, 0);
  }

  closeDropdown() {
    this.dropdownOpen2 = false;
  }

  ngOnInit(): void {
    
  }
}
