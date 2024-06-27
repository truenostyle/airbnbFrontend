import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { StaysService } from 'src/app/services/stays.service';
interface Cell {
  image?: string;
  text: string;
  status?: string;
}

@Component({
  selector: 'app-hosting-page',
  templateUrl: './hosting-page.component.html',
  styleUrls: ['./hosting-page.component.scss'],
})
export class HostingPageComponent {
  currentState: string = 'state1';
  currentState2: string = 'statusAll';
  headers: string[] = ['Listing', 'Location', 'Status'];
  stayStatuses = ['Upcoming', 'Completed', 'Cancelled'];

  headers2: string[] = [
    'Guests',
    'Listing',
    'Dates',
    'Booked',
    'Earnings',
    'Status',
  ];
  rows: Cell[][] = [
    [
      
    ],
  ];

  rows2: Cell[][] = [];
  statusLabels = ['AwaitingPayment', 'Upcoming', 'Completed', 'Cancelled'];

  constructor(staysService: StaysService, bookingsService: BookingService) {
    staysService.getMyStays().subscribe(
      (stays) =>
        (this.rows = stays.map((stay) => [
          {
            image: stay.imageUrl,
            text: stay.name,
          },
          { text: stay.place },
          { text: this.stayStatuses[stay.status] },
        ]))
    );

    bookingsService.getBookingsOfMyStays().subscribe((bookings) => {
      this.rows2 = bookings.map((booking) => [
        { image: booking.userImageUrl, text: booking.userName },
        { text: booking.stayName },
        { text: this.formatDuration(booking.checkInDate, booking.checkOutDate) },
        { text: booking.bookedDate.toLocaleString('default', { month: 'short' }) },
        { text: `$${booking.price}` },
        {
          status: booking.status.toString(),
          text: this.statusLabels[booking.status],
        },
      ]);
    });
  }

  setState(state: string) {
    this.currentState = state;
  }

  filteredRows2: Cell[][] = [];

  setState2(state: string) {
    console.log(this.rows2);
    this.currentState2 = state;
    if (this.currentState2 === 'statusAll') {
      // Если выбран "All", отображаем все ряды
      this.filteredRows2 = this.rows2;
    } else {
      // Фильтруем ряды по статусу
      this.filteredRows2 = this.rows2.filter((row) => {
        return row.some((cell) => cell.status === this.currentState2);
      });
    }
  }

  private formatDuration(startDate: Date, endDate: Date): string {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth =
      startDate.getMonth() != endDate.getMonth()
        ? endDate.toLocaleString('default', { month: 'short' })
        : '';
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }
}
