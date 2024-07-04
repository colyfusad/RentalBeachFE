import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ProductListComponent } from './rental/product-list/product-list.component';
import { ProductListCategoryComponent } from './rental/product-list-category/product-list-category.component';
import { CartComponent } from './rental/cart/cart.component';
import { ProductComponent } from './rental/admin/product/product/product.component';
import { CreateProductComponent } from './rental/admin/product/create-product/create-product.component';
import { NotFoundError } from 'rxjs';
import { EditProductComponent } from './rental/admin/product/edit-product/edit-product/edit-product.component';
import { CategoryListComponent } from './rental/admin/category/category-list/category-list.component';
import { OrderListComponent } from './rental/admin/order/order-list/order-list.component';
import { UserListComponent } from './rental/admin/user/user-list/user-list.component';
import { LoginAdminComponent } from './rental/admin/login-admin/login-admin.component';
import { AuthGuard } from './auth.guard';
import { AdminLayoutComponent } from './rental/admin/admin-layout/admin-layout.component';
import { OrderComponent } from './rental/order/order.component';
import { UpdateOrderComponent } from './rental/admin/order/update-order/update-order.component';
import { ViewDetailComponent } from './rental/admin/order/view-detail/view-detail.component';
import { InfoComponent } from './account/info/info/info.component';
import { ProductSearchComponent } from './rental/product-search/product-search.component';
import { UpdateInfoComponent } from './account/info/update-info/update-info.component';
import { ProductDetailsComponent } from './rental/product-details/product-details.component';
import { EditPasswordComponent } from './account/edit-password/edit-password.component';
import { ClientGuard } from './client.guard';
import { EditCategoryComponent } from './rental/admin/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './rental/admin/category/add-category/add-category.component';

const appRoutes: Routes = [
  // admin
  { path: 'admin', children: [
    { path: '', component: AdminLayoutComponent},
    { path: 'login', component: LoginAdminComponent},
    { path: 'products', canActivate: [AuthGuard], children: [
      { path: '', component: ProductComponent },
      { path: 'add', component: CreateProductComponent },
      { path: 'edit/:id', component: EditProductComponent}
    ]},
    { path: 'order-list', canActivate: [AuthGuard], children: [
      { path: '', component: OrderListComponent},
      { path: 'update-status/:id', component: UpdateOrderComponent},
      { path: 'view-details/:id', component: ViewDetailComponent}
    ]},
    { path: 'users', canActivate: [AuthGuard], children: [
      { path: '', component: UserListComponent}
    ]},
    { path: 'categories', canActivate: [AuthGuard], children: [
      { path: '', component: CategoryListComponent},
      { path: 'add', component: AddCategoryComponent },
      { path: 'edit/:id', component: EditCategoryComponent}
    ]},
  ], },

  // client
  { path: '', redirectTo: '/products/list', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'info-person', component: InfoComponent, canActivate: [ClientGuard]},
  { path: 'update-person', component: UpdateInfoComponent, canActivate: [ClientGuard]},
  { path: 'edit-password', component: EditPasswordComponent, canActivate: [ClientGuard]},
  { path: 'products/search/:searchQuery', component: ProductSearchComponent},
  { path: 'order/view-details/:id', component: ViewDetailComponent, canActivate: [ClientGuard]},
  { path: 'product/view-details/:id', component: ProductDetailsComponent},
  { path: 'cart', component: CartComponent, canActivate: [ClientGuard]},
  { path: 'order', component: OrderComponent, canActivate: [ClientGuard]},
  { path: 'products/list', component: ProductListComponent},
  { path: 'products/list/category/:categoryId', component: ProductListCategoryComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutesModule { }
