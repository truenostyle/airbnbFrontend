import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component'; // Импортируйте компонент register
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent },
  {path: 'register', component: RegisterComponent }
];
