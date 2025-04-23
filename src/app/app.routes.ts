import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductComponent } from './pages/product/product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'profile', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'orders', component: OrderHistoryComponent},
  { path: 'profile', component: ProfilePageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  
