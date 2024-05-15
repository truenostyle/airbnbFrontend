import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageRoutingModule } from './main-page-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgIf, JsonPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    GoogleSigninButtonModule,
    FormsModule,
    CarouselModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
