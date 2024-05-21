import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    GoogleSigninButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterPageComponent
  ]
})
export class RegisterPageModule { 
  
}
