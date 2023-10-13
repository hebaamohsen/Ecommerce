import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import { ForgetComponent } from './settings/forget/forget.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { SpecificbrandComponent } from './components/specificbrand/specificbrand.component';




const routes: Routes = [
  {path:'',component:BlankLayoutComponent,children:[
     {path:'',redirectTo:'home',pathMatch:'full'},
     {path:'home',component:HomeComponent,canActivate:[authGuard], title:'Home'},
     {path:'cart',component:CartComponent,canActivate:[authGuard], title:'Cart'},
     {path:'settings',loadChildren: ()=>import('./settings/settings.module').then((m) => m.SettingsModule)},
     {path:'allorders',component:AllordersComponent,canActivate:[authGuard], title:'Allorders'},
     {path:'payment/:id',component:PaymentComponent,canActivate:[authGuard], title:'Payment'},
     {path:'products',component:ProductsComponent,canActivate:[authGuard], title:'Products'},
     {path:'wishlist',component:WishlistComponent,canActivate:[authGuard], title:'Wishlist'},
     {path:'productdetails/:id',component:ProductdetailsComponent,canActivate:[authGuard], title:'Productdetails'},
     {path:'categories',component:CategoriesComponent,canActivate:[authGuard], title:'Categories'},
     {path:'categorydetails/:id',component:CategorydetailsComponent,canActivate:[authGuard], title:'Category Details'},
     {path:'brands',component:BrandsComponent,canActivate:[authGuard], title:'Brands'},
     {path:'specificbrand/:id',component:SpecificbrandComponent,canActivate:[authGuard], title:'Specific Brand'},
     {path:'forget',component:ForgetComponent,canActivate:[authGuard],title:'Forget Password'}
  ]},

  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'forgetPassword',component:ForgetComponent,title:'Forget Password'}
  ]},

 
  {path:'**',component:NotfoundComponent,title:'Not Found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
