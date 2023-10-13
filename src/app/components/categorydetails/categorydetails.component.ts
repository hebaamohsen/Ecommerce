import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService){}

  categoryId:string|null = '';
  categoryDetails:Category = {} as Category;

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.categoryId= params.get('id');
          
        }
      })

      this._ProductsService.getCategoryDetails(this.categoryId).subscribe({
        next:(response)=>{
          this.categoryDetails = response.data;
        }
      })
  }
}
