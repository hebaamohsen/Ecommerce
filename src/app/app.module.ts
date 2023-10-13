import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CuttextPipe } from './pipes/cuttext.pipe';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';   
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import { SearchPipe } from './search.pipe';
import { MyhttpInterceptor } from './interceptors/myhttp.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RouterLink } from '@angular/router';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { SpecificbrandComponent } from './components/specificbrand/specificbrand.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    BrandsComponent,
    CategoriesComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    FooterComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    CuttextPipe,
    ProductdetailsComponent,
    PaymentComponent,
    AllordersComponent,
    SearchPipe,
    WishlistComponent,
    CategorydetailsComponent,
    SpecificbrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule ,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    RouterLink
    ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
