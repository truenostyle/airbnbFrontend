import { Injectable } from '@angular/core';
import { WhishlistCategory } from '../models/whistlist-category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WhishlistsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public get(): Observable<WhishlistCategory[]> {
    return this.http.get<WhishlistCategory[]>(environment.apiUrl + '/api/whishlists', this.getOptions());
  }

  public add(name: string): Observable<unknown> {
    return this.http.post(environment.apiUrl + '/api/whishlists', { name }, this.getOptions());
  }
}
