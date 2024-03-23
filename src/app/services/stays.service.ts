import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StayBrief } from '../models/stay-brief.model';
import { StayItem } from '../models/stay-item.model';

@Injectable({
  providedIn: 'root',
})
export class StaysService {
  constructor(private http: HttpClient) {}

  public getStays(): Observable<StayItem[]> {
    return this.http.get<StayBrief[]>('http://localhost:5098/api/stays').pipe(
      map((staysBrief: StayBrief[]) =>
        staysBrief.map((stay: StayBrief) => ({
          id: stay.id,
          name: stay.name,
          imageUrl: stay.imageUrl,
          place: stay.place,
          duration: this.formatDuration(stay.startDate, stay.endDate),
          rating: stay.rating,
          price: stay.price,
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
