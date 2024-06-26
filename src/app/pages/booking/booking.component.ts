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
  
  messageText: string = '';
  messageSaved: boolean = false;

  phoneText: string = '';
  phoneSaved: boolean = false;

  profilePhoto: string | ArrayBuffer | null = null;
  profilePhotoSaved: boolean = false;

  modalOpen: boolean = false;
  orderModalOpen: boolean = false;
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
   
    const isValid = /^(?:\+380|0)\d{9}$/.test(value);
    return isValid ? null : { invalidPhone: true };
  }

  get phoneNumber() {
    return this.phoneForm.get('phoneNumber');
  }

  save() {
    if (this.phoneForm.valid) {

      console.log('Phone number is valid:', this.phoneForm.value.phoneNumber);
    }
  }

  cardValidator(control: any) {
    const value = control.value;

    const isValid = /^[0-9]{16}$/.test(value); 
    return isValid ? null : { invalidCard: true };
  }

  expirationValidator(control: any) {
    const value = control.value;
    const isValid = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value); 
    return isValid ? null : { invalidExpiration: true };
  }

  formatExpiration(event: any) {
    let input = event.target.value.trim();

    input = input.replace(/\D/g, '');

    if (input.length > 2 && input.indexOf('/') === -1) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }

    input = input.slice(0, 5);

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
    if (modalId === 0) {
      this.orderModalOpen = true;
    }
    else {
      this.modalOpen = true;
    }
    this.modalId = modalId;
    
    this.loadMessage();
    
  }

  closeModal() {
    this.modalOpen = false;
    this.modalId = null;
    document.body.style.overflow = ''; 
  }
  
  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePhoto = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  savePhoto() {
    this.profilePhotoSaved = true;
    this.closeModal();
  }

  savePhone() {
    this.phoneSaved = true;
    localStorage.setItem('phoneText', this.phoneText);
    this.closeModal();
  }

  loadPhone() {
    this.phoneText = localStorage.getItem('phoneText') || '';
  }

  saveMessage() {
    this.messageSaved = true;
    localStorage.setItem('messageText', this.messageText);
    this.closeModal();
  }

  loadMessage() {
    this.messageText = localStorage.getItem('messageText') || '';
  }

  areAllConditionsTrue(): boolean {
    return this.messageSaved && this.phoneSaved && this.profilePhotoSaved && this.cardForm.valid;
  }

  submitBooking() {
    if (this.areAllConditionsTrue()) {
      this.bookingService
      .book({
        checkIn: this.state.dateStart.toISOString(),
        checkOut: this.state.dateEnd.toISOString(),
        guests: this.state.guests,
        stayId: this.state.stay.id,
      })
      .subscribe();


    }
  }
}