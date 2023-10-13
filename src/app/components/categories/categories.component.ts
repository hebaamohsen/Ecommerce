import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor( private _ProductsService:ProductsService){}

  categoryData:Category[]=[];

  ngOnInit(): void {
      this._ProductsService.getCategories().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.categoryData = response.data
        }
      })
  }

}
