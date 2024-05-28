import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StayBrief } from '../models/stay-brief.model';
import { StayItem } from '../models/stay-item.model';
import { StayFilter } from '../models/stay-filter.model';
import { StayItemDetailed } from '../models/stay-item-detailed.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StaysService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getStay(id: number): Observable<StayItemDetailed> {
    return this.http.get<StayItemDetailed>(`http://localhost:5098/api/stays/${id}`);
  }

  public getMyStays(): Observable<StayItem[]> {
    return this.http.get<StayItem[]>('http://localhost:5098/api/stays/my', this.getOptions());
  }

  public getStays(filter: StayFilter): Observable<StayItem[]> {
    let params = new HttpParams();
    params = params.append('MinGuests', filter.minGuests.toString());
    params = params.append('MinBathrooms', filter.minBathrooms.toString());
    params = params.append('MinBedrooms', filter.minBedrooms.toString());
    params = params.append('MinBeds', filter.minBeds.toString());
    params = params.append('PlaceType', filter.roomType.toString());
    params = filter.location !== '' ? params.append('Location', filter.location) : params;

    return this.http.get<StayBrief[]>('http://localhost:5098/api/stays', { params } ).pipe(
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
