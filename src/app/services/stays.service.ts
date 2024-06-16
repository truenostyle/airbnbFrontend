import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StayBrief } from '../models/stay-brief.model';
import { StayItem } from '../models/stay-item.model';
import { StayFilter } from '../models/stay-filter.model';
import { StayItemDetailed } from '../models/stay-item-detailed.model';
import { BaseService } from './base.service';
import { environment } from 'src/environment/environment';
import { NewStay } from '../models/new-stay.model';

@Injectable({
  providedIn: 'root',
})
export class StaysService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public addStay(stay: NewStay): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/stays', stay, this.getOptions());
  }

  public getStay(id: string): Observable<StayItemDetailed> {
    return this.http.get<StayItemDetailed>(environment.apiUrl + `/api/stays/${id}`);
  }

  public getMyStays(): Observable<StayItem[]> {
    return this.http.get<StayItem[]>(environment.apiUrl + '/api/stays/my', this.getOptions());
  }

  public getStays(filter: StayFilter): Observable<StayItem[]> {
    let params = new HttpParams();
    params = params.append('MinGuests', filter.minGuests.toString());
    params = params.append('MinBathrooms', filter.minBathrooms.toString());
    params = params.append('MinBedrooms', filter.minBedrooms.toString());
    params = params.append('MinBeds', filter.minBeds.toString());
    params = params.append('PlaceType', filter.roomType.toString());
    params = params.append('Count', 100);
    params = filter.minPrice ? params.append('MinPrice', filter.minPrice) : params;
    params = filter.maxPrice ? params.append('MaxPrice', filter.maxPrice) : params;
    params = filter.checkInDate ? params.append('CheckInDate', filter.checkInDate.toISOString()) : params;
    params = filter.checkOutDate ? params.append('CheckOutDate', filter.checkOutDate.toISOString()) : params;
    filter.places?.forEach(place => params = params.append('Places', place));
    params = filter.location !== '' ? params.append('Location', filter.location) : params;

    return this.http.get<StayBrief[]>(environment.apiUrl + '/api/stays', { params } ).pipe(
      map((staysBrief: StayBrief[]) =>
        staysBrief.map((stay: StayBrief) => ({
          ...stay,
          duration: this.formatDuration(stay.startDate, stay.endDate),
        }))
      )
    );
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
