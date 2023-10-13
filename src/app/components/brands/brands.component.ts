import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _ProductsService:ProductsService){}

  brands:any[]=[];

  ngOnInit(): void {
      this._ProductsService.getAllBrands().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.brands = response.data;
        }
      })
  }
}
