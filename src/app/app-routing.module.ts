import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { HelpcenterComponent } from './pages/helpcenter/helpcenter.component';
import { ForguestsComponent } from './pages/forguests/forguests.component';
import { WishlistsComponent } from './pages/wishlists/wishlists.component';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule), component: MainPageComponent},
  {path: 'register', loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule), component: RegisterPageComponent},
  {path: 'product', component: ProductPageComponent},
  {path: 'helpcenter', component: HelpcenterComponent},
  {path: 'forguests', component: ForguestsComponent},
  {path: 'wishlists', component: WishlistsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
