import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { HelpcenterComponent } from './pages/helpcenter/helpcenter.component';
import { ForguestsComponent } from './pages/forguests/forguests.component';
import { SecondHeaderComponent } from './pages/second-header/second-header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WishlistsComponent } from './pages/wishlists/wishlists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatepickerComponent } from './pages/datepicker/datepicker.component';
import { BookingComponent } from './pages/booking/booking.component';
import { RouterModule } from '@angular/router';
import { BookingSuccessPageComponent } from './pages/booking-success-page/booking-success-page.component';
import { PersonalSettingsComponent } from './pages/personal-settings/personal-settings.component';
import { HostingPageComponent } from './pages/hosting-page/hosting-page.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    HelpcenterComponent,
    ForguestsComponent,
    SecondHeaderComponent,
    FooterComponent,
    WishlistsComponent,
    AccountSettingsComponent,
    DatepickerComponent,
    BookingComponent,
    BookingSuccessPageComponent,
    PersonalSettingsComponent,
    HostingPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    CarouselModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSlideToggleModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '877872219386-ta86ilqaog25pt5e5buu55jjmafr19g9.apps.googleusercontent.com', {
                scopes: 'email',
              }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
