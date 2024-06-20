import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/booking-request.model';
import { BaseService } from './base.service';
import { environment } from 'src/environment/environment';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  book(body: BookingRequest): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/booking', body, this.getOptions());
  }

  getBookingsOfMyStays(): Observable<Booking[]> {
    return this.http.get<Booking[]>(environment.apiUrl + '/api/booking/my', this.getOptions());
  }
}
