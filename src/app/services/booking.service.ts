import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/booking-request.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  book(body: BookingRequest): Observable<any> {
    return this.http.post('http://localhost:5098/api/booking', body, this.getOptions());
  }
}
