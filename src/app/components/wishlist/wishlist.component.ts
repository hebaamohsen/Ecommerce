import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService, 
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _CartService:CartService){}

  products : any[] = [];
  wishlistData:string[]=[];

  ngOnInit(): void {
      this._WishlistService.getWishlist().subscribe({
        next:(response)=>{
          this.products = response.data;

          const newData = response.data.map((item:any) => item._id);
          this.wishlistData = newData;
          
        }
      })
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
          this._WishlistService.wishlistNumber.next(response.count+1);
        }
      })
      }
      
      removeFav(prodId:string|undefined):void{
        this._WishlistService.removeItemFromWishlist(prodId).subscribe({
          next:(response) =>{
            console.log('remove',response);
            this._ToastrService.success(response.message);
            this.wishlistData = response.data;

            const newProductsData = this.products.filter((item:any)=>this.wishlistData.includes(item._id));
            this.products=newProductsData;
            
          }
        })

        this._WishlistService.getWishlist().subscribe({
          next:(response)=>{
            this._WishlistService.wishlistNumber.next(response.count);
          }
        })

      }

}
