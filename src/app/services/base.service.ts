import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected getOptions(): { headers: HttpHeaders, withCredentials: boolean } {
    const token = localStorage.getItem("Authorization");
    let headers = new HttpHeaders;
    if(token) {
      headers = headers.set("Authorization", token);
    }
    return { withCredentials: true, headers: headers};
  }
}
