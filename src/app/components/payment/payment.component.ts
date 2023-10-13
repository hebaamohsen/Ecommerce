import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}

  cartId:any;

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
         this.cartId= params.get('id')
         
         
        }
      })
  }

  orderForm:FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl('')
  })

  handleForm():void{
    const orderInfo = this.orderForm.value;
    const cartId = this.cartId;

    this._CartService.paymentMethod(cartId,orderInfo).subscribe({
      next:(response)=>{
        window.open(response.session.url,'_self')
        
      }
    })
    
  }

}
