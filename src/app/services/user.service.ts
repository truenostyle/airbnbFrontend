import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  #currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
  currentUser$ = this.#currentUser$.asObservable();

  constructor(private http: HttpClient) {
    super();
    this.http
      .get<UserInfo>(environment.apiUrl + '/api/user/me', this.getOptions())
      .subscribe({ next: (user) => this.#currentUser$.next(user) });
  }

  updateDataInfo(userInfo: UserInfo): Observable<object> {
    return this.http
    .post(environment.apiUrl + '/api/user/me', userInfo, this.getOptions());
  }

  isLoggedIn(): boolean {
    return !!this.#currentUser$.value; // Возвращает true, если currentUser$ имеет значение
  }
}

