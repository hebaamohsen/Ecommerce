import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService, private _CartService:CartService,private _ToastrService:ToastrService,private _Renderer2:Renderer2){}
  
  productId : string | null= '';
  producDetails : any = null;

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params) => {
         this.productId = params.get('id');
         
        }
      });

      this._ProductsService.getProductDetails(this.productId).subscribe({
        next:(response) =>{
          this.producDetails = response.data;
          
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

  productOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

}
