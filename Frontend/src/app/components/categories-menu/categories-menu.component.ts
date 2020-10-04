import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {
  categories:Category[];

  constructor(private productService:ProductService ) { }

  ngOnInit(): void {
    this.listCategories();
  }
  listCategories() {
    this.productService.getCategories().subscribe(
      data => {
        //JSON.stringify(data) to take a given object and display i tin JSON format  
        console.log('categories'+JSON.stringify(data));
        this.categories = data;
      }
    )
  } 

}
