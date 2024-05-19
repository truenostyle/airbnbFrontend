import { Injectable } from '@angular/core';
import { BookingState } from '../models/booking-state.model';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  #storageKey = "bookingState";
  state?: BookingState;

  constructor() {
    const stateString = localStorage.getItem(this.#storageKey);
    this.state = stateString ? JSON.parse(stateString) as BookingState ?? undefined : undefined;
  }

  setState(state: BookingState) {
    this.state = state;
    localStorage.setItem(this.#storageKey, JSON.stringify(state));
  }
}
