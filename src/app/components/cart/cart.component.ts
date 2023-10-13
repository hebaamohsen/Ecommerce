import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService,private _Renderer2:Renderer2){}

  cartDetails:any =null;

  ngOnInit(): void {
      this._CartService.getCartUser().subscribe({
        next:({data}) =>{
          console.log(data);
          
          this.cartDetails = data
          
        }
      })
  }

  removeProduct(id:string):void{
    this._CartService.deleteCartItem(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartDetails = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems)
        
      }
    })
  }

  changeCount(count:number,id:string,el1:HTMLButtonElement,el2:HTMLButtonElement):void{

    if(count >= 1){

      this._Renderer2.setAttribute(el1,'disabled','true');
      this._Renderer2.setAttribute(el2,'disabled','true');

      this._CartService.updateCount(id,count).subscribe({
        next:(response)=>{
          console.log(response);
          this.cartDetails = response.data
          this._Renderer2.removeAttribute(el1,'disabled');
          this._Renderer2.removeAttribute(el2,'disabled');
          
        },
        error:(err)=>{
          this._Renderer2.removeAttribute(el1,'disabled');
          this._Renderer2.removeAttribute(el2,'disabled');
        }
      }
      )
      
    }
   
  }
  
  clear():void{
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        console.log(response);
        if(response.message === "success"){
          this.cartDetails = null;
          this._CartService.cartNumber.next(response.numOfCartItems)
        
        }
        
      }
    })
  }
}
