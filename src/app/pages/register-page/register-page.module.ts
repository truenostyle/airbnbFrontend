import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { FormsModule } from '@angular/forms';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RegisterPageRoutingModule } from './register-page-routing.module';



@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    FormsModule,
    GoogleSigninButtonModule
  ],
  exports: [
    RegisterPageComponent
  ]
})
export class RegisterPageModule { }
