import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service'; // Замените на ваш сервис авторизации

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      // Если пользователь не авторизован, перенаправляем его на страницу входа
      this.router.navigate(['/auth-error']);
      return false;
    }
  }
}
