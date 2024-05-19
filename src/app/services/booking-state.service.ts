import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { StayItemDetailed } from '../models/stay-item-detailed.model';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  #dateStart$ = new ReplaySubject<Date>(1);
  #dateEnd$ = new ReplaySubject<Date>(1);
  #guests$ = new ReplaySubject<number>(1);
  #cost$ = new ReplaySubject<number>(1);
  #stay$ = new ReplaySubject<StayItemDetailed>(1);
  
  dateStart$ = this.#dateStart$.asObservable();
  dateEnd$ = this.#dateEnd$.asObservable();
  guests$ = this.#guests$.asObservable();
  cost$ = this.#cost$.asObservable();
  stay$ = this.#stay$.asObservable();


  changeDateStart(start: Date) {
    this.#dateStart$.next(start);
  }

  changeDateEnd(end: Date) {
    this.#dateEnd$.next(end);
  }

  changeGuestCount(count: number) {
    this.#guests$.next(count);
  }

  changeCost(cost: number) {
    this.#cost$.next(cost);
  }

  changeStay(stay: StayItemDetailed) {
    this.#stay$.next(stay);
  }
}
