import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralHeaderComponent } from './component/general-header/general-header.component';
import { LandingComponent } from './general/landing/landing.component';
import { CustomCarouselComponent } from './component/custom-carousel/custom-carousel.component';
import { GeneralFooterComponent } from './component/general-footer/general-footer.component';
import { AboutComponent } from './general/about/about.component';
import { ShopComponent } from './general/shop/shop.component';
import { ServicesComponent } from './general/services/services.component';
import { ContactComponent } from './general/contact/contact.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { CartComponent } from './general/cart/cart.component';
import { ResaleComponent } from './general/service-pages/resale/resale.component';
import { GiftVoucherComponent } from './general/service-pages/gift-voucher/gift-voucher.component';
import { GiftBoxComponent } from './general/service-pages/gift-box/gift-box.component';
import { ShoppingRequestComponent } from './general/service-pages/shopping-request/shopping-request.component';
import { CheckoutComponent } from './general/checkout/checkout.component';
import { ShortenPipe } from './custom-pipe/shorten.pipe';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Angular4PaystackModule } from 'angular4-paystack';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemPageComponent } from './general/item-page/item-page.component';
import { NotificationComponent } from './component/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralHeaderComponent,
    LandingComponent,
    CustomCarouselComponent,
    GeneralFooterComponent,
    AboutComponent,
    ShopComponent,
    ServicesComponent,
    ContactComponent,
    SidebarComponent,
    CartComponent,
    ResaleComponent,
    GiftVoucherComponent,
    GiftBoxComponent,
    ShoppingRequestComponent,
    CheckoutComponent,

    ItemPageComponent,
    NotificationComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    Angular4PaystackModule.forRoot('pk_test_4444444444444444'),
    BrowserAnimationsModule,
    NgxUiLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
