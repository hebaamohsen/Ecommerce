import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _Router:Router,private _CartService:CartService,private _WishlistService:WishlistService){}

  cartCount:number = 0;
  wishlistCount:number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data) =>{
        this.cartCount = data;
      }
    })

    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    })

    this._WishlistService.wishlistNumber.subscribe({
      next:(data)=>{
        console.log(data)
        this.wishlistCount = data;
      }
    })

    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        this._WishlistService.wishlistNumber.next(response.count)
      }
    })
  }

  SignOut():void{
    localStorage.removeItem('token');
    this._Router.navigate(['/login'])
  }
}
