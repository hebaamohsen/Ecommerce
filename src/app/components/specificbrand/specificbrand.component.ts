import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-specificbrand',
  templateUrl: './specificbrand.component.html',
  styleUrls: ['./specificbrand.component.scss']
})
export class SpecificbrandComponent implements OnInit {

  constructor(private _ProductsService:ProductsService,private _ActivatedRoute:ActivatedRoute){}

  brandId:string|null='';
  brands:any = null;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.brandId = params.get("id")
      }
    })

      this._ProductsService.getSpecificBrand(this.brandId).subscribe({
        next:(response)=>{
          console.log(response.data);
          this.brands = response.data;
          
        }
      })
  }
}
