import { Component, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
constructor(private _ProductsService:ProductsService , 
  private _CartService:CartService ,
   private _ToastrService:ToastrService,
   private _Renderer2:Renderer2,
   private _WishlistService:WishlistService){}

productsData : any[] = [];
categoryData :Category[] = [];
termInput:string = '';
wishlistData:string[]=[];

ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response) => {
        console.log(response.data);
        this.productsData = response.data;
      },
      error:(err) => {
        console.log(err);
        
      } 
    });

    this._ProductsService.getCategories().subscribe({
      next:(response) =>{
        console.log(response.data);
        this.categoryData = response.data;
        
      },  
      error:(err) =>{
        console.log(err);
        
      } 
     });

     this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        console.log(response);

        const newData = response.data.map((item:any) => item._id);
        this.wishlistData = newData;
      }
     })
     
}

categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  autoplay: true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

mainSlidOption: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items: 1,
  nav: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplaySpeed:1000
}

addProduct(id:string,element:HTMLButtonElement):void{
  this._Renderer2.setAttribute(element,'disabled','true')

  this._CartService.addToCartItem(id).subscribe({
    next:(response) =>{
      console.log(response);
      this._CartService.cartNumber.next(response.numOfCartItems);

      this._ToastrService.success(response.message);
      this._Renderer2.removeAttribute(element,'disabled')
      
    },
    error:(err)=>{
      console.log(err)
      this._Renderer2.removeAttribute(element,'disabled')
    }
  })
}

addFav(prodId:string|undefined):void{
this._WishlistService.addToWishlist(prodId).subscribe({
  next:(response)=>{
    console.log(response);
    this._ToastrService.success(response.message);
    this.wishlistData = response.data;
    
  }
})

this._WishlistService.getWishlist().subscribe({
  next:(response)=>{
    console.log('addfav',response);
    
    this._WishlistService.wishlistNumber.next(response.count+1);
  }
})
}

removeFav(prodId:string|undefined):void{
  this._WishlistService.removeItemFromWishlist(prodId).subscribe({
    next:(response) =>{
      console.log(response);
      this._ToastrService.success(response.message);
      this.wishlistData = response.data;
      
    }
  })

  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      console.log('remove',response);
      
      this._WishlistService.wishlistNumber.next(response.count);
    }
  })
}
}
