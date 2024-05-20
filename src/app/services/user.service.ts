import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class UserService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>('http://localhost:5098/api/user/me', this.getOptions());
      }
  }