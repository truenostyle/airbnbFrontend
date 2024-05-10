import { Injectable } from '@angular/core';
import { WhishlistCategory } from '../models/whistlist-category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class WhishlistsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public get(): Observable<WhishlistCategory[]> {
    return this.http.get<WhishlistCategory[]>('http://localhost:5098/api/whishlists', this.getOptions());
  }

  public add(name: string): Observable<unknown> {
    return this.http.post('http://localhost:5098/api/whishlists', { name }, this.getOptions());
  }
}
