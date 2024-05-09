import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { HeaderComponent } from './pages/header/header.component';
import { HelpcenterComponent } from './pages/helpcenter/helpcenter.component';
import { ForguestsComponent } from './pages/forguests/forguests.component';
import { SecondHeaderComponent } from './pages/second-header/second-header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WishlistsComponent } from './pages/wishlists/wishlists.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    HeaderComponent,
    HelpcenterComponent,
    ForguestsComponent,
    SecondHeaderComponent,
    FooterComponent,
    WishlistsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    CarouselModule,
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
