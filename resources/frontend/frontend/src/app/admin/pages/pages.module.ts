import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ManageProductsComponent } from './product/manage-products/manage-products.component';
import { AdminModalComponent } from './components/admin-modal/admin-modal.component';
import { CreateEditProductComponent } from './product/components/create-edit-product/create-edit-product.component';
import { DeleteProductComponent } from './product/components/delete-product/delete-product.component';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';
import { CreateEditCategoryComponent } from './category/components/create-edit-category/create-edit-category.component';
import { DeleteCategoryComponent } from './category/components/delete-category/delete-category.component';
import { DiscountComponent } from './discount/discount.component';
import { CreateEditDiscountComponent } from './discount/components/create-edit-discount/create-edit-discount.component';
import { DeleteDiscountComponent } from './discount/components/delete-discount/delete-discount.component';
import { ShortenPipe } from 'src/app/custom-pipe/shorten.pipe';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AdminModalSmallComponent } from './components/admin-modal-small/admin-modal-small.component';
import { ManageSizesComponent } from './size/manage-sizes/manage-sizes.component';
import { AddEditSizeComponent } from './size/component/add-edit-size/add-edit-size.component';
import { DeleteSizeComponent } from './size/component/delete-size/delete-size.component';
import { ManageSizeTypesComponent } from './size-types/manage-size-types/manage-size-types.component';
import { DeleteSizeTypeComponent } from './size-types/component/delete-size-type/delete-size-type.component';
import { AddEditSizeTypeComponent } from './size-types/component/add-edit-size-type/add-edit-size-type.component';

import { ManageOrdersComponent } from './orders/manage-orders/manage-orders.component';
import { ViewOrderProductsComponent } from './orders/components/view-order-products/view-order-products.component';
import { DeleteOrderComponent } from './orders/components/delete-order/delete-order.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ManageProductsComponent,  AdminModalComponent, CreateEditProductComponent,
    DeleteProductComponent, ManageCategoriesComponent, CreateEditCategoryComponent,
    DeleteCategoryComponent, DiscountComponent, CreateEditDiscountComponent,
    DeleteDiscountComponent,
    ShortenPipe,
    AdminModalSmallComponent,
    ManageSizesComponent,
    AddEditSizeComponent,
    DeleteSizeComponent,
    ManageSizeTypesComponent,
    DeleteSizeTypeComponent,
    AddEditSizeTypeComponent,

    ManageOrdersComponent,
    ViewOrderProductsComponent,
    DeleteOrderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    RxReactiveFormsModule
  ]
})
export class PagesModule { }
