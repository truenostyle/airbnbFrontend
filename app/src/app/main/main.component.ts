import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(
    private router: Router,
  ){}

  async goRegister() {
    await this.router.navigate(['/register'])
  }

  email: string = '';
  password: string = '';

  isFormFilled(): boolean {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }

  login(): void {
    if (this.isFormFilled()) {
      // Ваш код для входа
      console.log('Выполняется вход');
    } else {
      console.log('Пожалуйста, заполните все поля');
    }
  }

  loginBoxHidden: boolean = true;

  toggleLoginBox(): void {
    this.loginBoxHidden = !this.loginBoxHidden;
  }
}
