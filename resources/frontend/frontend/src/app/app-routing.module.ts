import { ItemPageComponent } from './general/item-page/item-page.component';
import { ShoppingRequestComponent } from './general/service-pages/shopping-request/shopping-request.component';
import { GiftBoxComponent } from './general/service-pages/gift-box/gift-box.component';
import { GiftVoucherComponent } from './general/service-pages/gift-voucher/gift-voucher.component';
import { ResaleComponent } from './general/service-pages/resale/resale.component';
import { CartComponent } from './general/cart/cart.component';
import { ContactComponent } from './general/contact/contact.component';
import { ServicesComponent } from './general/services/services.component';
import { AboutComponent } from './general/about/about.component';
import { LandingComponent } from './general/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './general/shop/shop.component';

const routes: Routes = [
  {
    path:'',
    component: LandingComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path:'item',
    component: ItemPageComponent
  },
  {
    path: 'service/resale',
    component: ResaleComponent
  },
  {
    path: 'service/gift-voucher',
    component: GiftVoucherComponent
  },
  {
    path: 'service/gift-box',
    component: GiftBoxComponent
  },
  {
    path: 'service/shopping-request',
    component: ShoppingRequestComponent
  },

  { path: 'admin', component: AdminComponent,
   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
