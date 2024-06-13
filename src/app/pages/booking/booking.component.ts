import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingState } from 'src/app/models/booking-state.model';
import { BookingStateService } from 'src/app/services/booking-state.service';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  state!: BookingState;
  cardForm!: FormGroup;
  phoneForm!: FormGroup;

  modalOpen: boolean = false;
  modalId: number | null = null;

  constructor(
    public stateService: BookingStateService,
    private router: Router,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    if (this.stateService.state === undefined) {
      this.router.navigate(['/main']);
      return;
    }
    this.state = this.stateService.state;

    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardValidator]],
      expiration: ['', [Validators.required, this.expirationValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });

    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required, this.uaPhoneValidator]]
    });

    
  }

  uaPhoneValidator(control: any) {
    const value = control.value;
    // Регулярное выражение для проверки украинского номера телефона (может начинаться с +380 или просто 0, и содержит 10-12 цифр)
    const isValid = /^(?:\+380|0)\d{9}$/.test(value);
    return isValid ? null : { invalidPhone: true };
  }

  get phoneNumber() {
    return this.phoneForm.get('phoneNumber');
  }

  save() {
    if (this.phoneForm.valid) {
      // Логика сохранения данных
      console.log('Phone number is valid:', this.phoneForm.value.phoneNumber);
    }
  }

  cardValidator(control: any) {
    const value = control.value;
    // Пример простой валидации (можете заменить на более сложную проверку)
    const isValid = /^[0-9]{16}$/.test(value); // Простая проверка на 16 цифр
    return isValid ? null : { invalidCard: true };
  }

  expirationValidator(control: any) {
    const value = control.value;
    const isValid = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value); // Простая проверка формата MM/YY
    return isValid ? null : { invalidExpiration: true };
  }

  formatExpiration(event: any) {
    let input = event.target.value.trim();
    // Удаляем все нечисловые символы
    input = input.replace(/\D/g, '');
    // Добавляем слеш после второго символа, если его нет
    if (input.length > 2 && input.indexOf('/') === -1) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    // Обрезаем дату после 6 символов (месяц и год)
    input = input.slice(0, 5);
    // Обновляем значение в форме
    this.cardForm.patchValue({
      expiration: input
    });
  }


  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }

  get expiration() {
    return this.cardForm.get('expiration');
  }

  get cvv() {
    return this.cardForm.get('cvv');
  }

  isFormInvalid(): boolean {
    return this.cardForm.invalid && (!!this.cardNumber?.touched || !!this.expiration?.touched || !!this.cvv?.touched);
  }
  

  ngOnInit(): void {}


  openModal(modalId: number) {
    this.modalId = modalId;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden'; // Запрет прокрутки фона при открытом модальном окне
  }

  closeModal() {
    this.modalOpen = false;
    this.modalId = null;
    document.body.style.overflow = ''; // Восстановление прокрутки фона при закрытии модального окна
  }


  submitBooking() {
    this.bookingService
      .book({
        checkIn: this.state.dateStart,
        checkOut: this.state.dateEnd,
        guests: this.state.guests,
        stayId: this.state.stay.id,
      })
      .subscribe({ next: () => this.router.navigate(['/booking/success']) });
  }
}
