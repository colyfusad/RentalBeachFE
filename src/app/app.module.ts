import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // new
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule, HttpHandler, provideHttpClient, HttpBackend } from '@angular/common/http';
import { HttpServiceService } from './services/http-service.service';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AppRoutesModule } from './app-routes.module';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawerContent } from '@angular/material/sidenav';
import { MatDrawerMode } from '@angular/material/sidenav';


import { ProductListComponent } from './rental/product-list/product-list.component';
import { ProductItemComponent } from './rental/product-item/product-item.component';
import { FooterComponent } from './rental/footer/footer.component';
import { ProductListCategoryComponent } from './rental/product-list-category/product-list-category.component';
import { CartComponent } from './rental/cart/cart.component';
import { ProductComponent } from './rental/admin/product/product/product.component';
import { CreateProductComponent } from './rental/admin/product/create-product/create-product.component';
import { EditProductComponent } from './rental/admin/product/edit-product/edit-product/edit-product.component';
import { MenuAdminComponent } from './rental/admin/menu-admin/menu-admin.component';
import { CategoryListComponent } from './rental/admin/category/category-list/category-list.component';
import { AddCategoryComponent } from './rental/admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './rental/admin/category/edit-category/edit-category.component';
import { OrderListComponent } from './rental/admin/order/order-list/order-list.component';
import { UserListComponent } from './rental/admin/user/user-list/user-list.component';
import { MenubarComponent } from './rental/menubar/menubar.component';
import { LoginAdminComponent } from './rental/admin/login-admin/login-admin.component';
import { AdminLayoutComponent } from './rental/admin/admin-layout/admin-layout.component';
import { OrderComponent } from './rental/order/order.component';
import { UpdateOrderComponent } from './rental/admin/order/update-order/update-order.component';
import { ViewDetailComponent } from './rental/admin/order/view-detail/view-detail.component';
import { InfoComponent } from './account/info/info/info.component';
import { ProductSearchComponent } from './rental/product-search/product-search.component';
import { UpdateInfoComponent } from './account/info/update-info/update-info.component';
import { ProductDetailsComponent } from './rental/product-details/product-details.component';
import { EditPasswordComponent } from './account/edit-password/edit-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductItemComponent,
    FooterComponent,
    ProductListCategoryComponent,
    CartComponent,
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
    MenuAdminComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    OrderListComponent,
    UserListComponent,
    MenubarComponent,
    LoginAdminComponent,
    AdminLayoutComponent,
    OrderComponent,
    UpdateOrderComponent,
    ViewDetailComponent,
    InfoComponent,
    ProductSearchComponent,
    UpdateInfoComponent,
    ProductDetailsComponent,
    EditPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutesModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    AppRoutesModule
  ],
  providers: [
    provideClientHydration(),
    HttpClientModule,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
