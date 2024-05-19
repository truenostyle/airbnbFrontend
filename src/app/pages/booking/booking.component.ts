import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingState } from 'src/app/models/booking-state.model';
import { BookingStateService } from 'src/app/services/booking-state.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  state!: BookingState;
  constructor(
    public stateService: BookingStateService,
    private router: Router,
    private bookingService: BookingService
  ) {
    if (this.stateService.state === undefined) {
      this.router.navigate(['/main']);
      return;
    }
    this.state = this.stateService.state;
  }

  ngOnInit(): void {}

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
