import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { MainPageRoutingModule } from './main-page-routing.module';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    GoogleSigninButtonModule,
    FormsModule,
    CarouselModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
