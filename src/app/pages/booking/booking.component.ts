import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap, map, mergeMap, tap, zip } from 'rxjs';
import { BookingStateService } from 'src/app/services/booking-state.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  constructor(
    public stateService: BookingStateService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {}

  submitBooking() {
    zip(
      this.stateService.dateStart$,
      this.stateService.dateEnd$,
      this.stateService.guests$,
      this.stateService.cost$,
      this.stateService.stay$
    )
      .pipe(
        map((values) => {
          return {
            checkIn: values[0],
            checkOut: values[1],
            guests: values[2],
            cost: values[3],
            stayId: values[4].id,
          };
        }),
        mergeMap((request) => this.bookingService.book(request))
      )
      .subscribe({ next: () => this.router.navigate(['/booking/success']) });
  }
}
