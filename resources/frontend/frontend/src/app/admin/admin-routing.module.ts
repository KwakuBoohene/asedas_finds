import { AuthGuard } from './../guards/auth/auth.guard';
import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  { path: 'dashboard', component: PagesComponent,
  canActivate: [AuthGuard],
   loadChildren: () => import('../admin/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
