import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  guestCount: number = 0;
  cost: number = 0;

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.currentDateRange.subscribe(dateRange => {
      this.startDate = dateRange.start;
      this.endDate = dateRange.end;
    });

    this.stateService.currentGuestCount.subscribe(count => {
      this.guestCount = count;
    });

    this.stateService.currentCost.subscribe(cost => {
      this.cost = cost;
    });
  }
}
