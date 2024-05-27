import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  #currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
  currentUser$ = this.#currentUser$.asObservable();

  constructor(private http: HttpClient) {
    super();
    this.http
      .get<UserInfo>('http://localhost:5098/api/user/me', this.getOptions())
      .subscribe({ next: (user) => this.#currentUser$.next(user) });
  }

  updateDataInfo(userInfo: UserInfo): Observable<object> {
    return this.http
    .post('http://localhost:5098/api/user/me', userInfo, this.getOptions());
  }
}
