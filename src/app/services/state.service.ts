import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private dateRangeSource = new BehaviorSubject<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  private guestCountSource = new BehaviorSubject<number>(0);
  private costSource = new BehaviorSubject<number>(0);

  currentDateRange = this.dateRangeSource.asObservable();
  currentGuestCount = this.guestCountSource.asObservable();
  currentCost = this.costSource.asObservable();

  changeDateRange(start: Date | null, end: Date | null) {
    this.dateRangeSource.next({ start, end });
  }

  changeGuestCount(count: number) {
    this.guestCountSource.next(count);
  }
  changeCost(cost: number) {
    this.costSource.next(cost);
  }
}
