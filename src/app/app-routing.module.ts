import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { HelpcenterComponent } from './pages/helpcenter/helpcenter.component';
import { ForguestsComponent } from './pages/forguests/forguests.component';
import { WishlistsComponent } from './pages/wishlists/wishlists.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingSuccessPageComponent } from './pages/booking-success-page/booking-success-page.component';
import { PersonalSettingsComponent } from './pages/personal-settings/personal-settings.component';
import { HostingPageComponent } from './pages/hosting-page/hosting-page.component';
import { StarthostPageComponent } from './pages/starthost-page/starthost-page.component';




const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule), component: MainPageComponent},
  {path: 'register', loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule), component: RegisterPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'helpcenter', component: HelpcenterComponent},
  {path: 'forguests', component: ForguestsComponent},
  {path: 'wishlists', component: WishlistsComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'booking/success', component: BookingSuccessPageComponent},
  {path: 'personal-settings', component: PersonalSettingsComponent},
  {path: 'hosting', component: HostingPageComponent},
  {path: 'start-host', component: StarthostPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
