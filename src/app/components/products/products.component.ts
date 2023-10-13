import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService, private _Renderer2:Renderer2, private _CartService:CartService , private _ToastrService:ToastrService){}
  
productsData : any[] = [];
pageSize:number = 0;
currentPage:number =1;
total:number = 0;

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response) => {
        console.log(response.data);
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results

      },
      error:(err) => {
        console.log(err);
        
      } 
    });
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

  pageChanged(event:any):void{
    this._ProductsService.getProducts(event).subscribe({
      next:(response) => {
        console.log(response.data);
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results

      },
      error:(err) => {
        console.log(err);
        
      } 
    });
  }
}
