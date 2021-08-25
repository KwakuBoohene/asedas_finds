import { ManageOrdersComponent } from './orders/manage-orders/manage-orders.component';
import { ManageSizeTypesComponent } from './size-types/manage-size-types/manage-size-types.component';
import { CreateEditDiscountComponent } from './discount/components/create-edit-discount/create-edit-discount.component';
import { DiscountComponent } from './discount/discount.component';
import { CreateEditCategoryComponent } from './category/components/create-edit-category/create-edit-category.component';
import { ManageCategoriesComponent } from './category/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './product/manage-products/manage-products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageSizesComponent } from './size/manage-sizes/manage-sizes.component';
import { AddEditSizeComponent } from './size/component/add-edit-size/add-edit-size.component';
import { AddEditSizeTypeComponent } from './size-types/component/add-edit-size-type/add-edit-size-type.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch : 'full'
  },
  {
    path: 'product',
    children:[
      { path:'',
        component:ManageProductsComponent
      }
    ]
  },
  {
    path: 'category',
    children:[
      { path:'',
        component:ManageCategoriesComponent
      }
    ]
  },
  {
    path: 'discount',
    children:[
      { path:'',
        component:DiscountComponent
      }
    ]
  },
  {
    path: 'size',
    children:[
      { path:'',
        component:ManageSizesComponent
      }
    ]
  },
  {
    path: 'size-type',
    children:[
      { path:'',
        component:ManageSizeTypesComponent
      }
    ]
  },
  {
    path: 'orders',
    children:[
      { path:'',
        component:ManageOrdersComponent
    }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
