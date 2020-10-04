import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  size: number = 10;
  pageNumber: number = 1;
  totalElements: number = 0;

  previousKeyword: string = null;
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProduct();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }
    // checking if we have a differenet category the previous 
    // Note : angular will reuse a component if it is currently being viewed

    // if we have a differenet category id than previous 
    // Then set the PageNumber back to 1 
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;

    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(this.currentCategoryId, this.pageNumber);

    // now get the products for the given category id
    this.productService.getProductsPaginate(this.pageNumber - 1, this.size, this.currentCategoryId).subscribe(this.processResult());

  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.size = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  handleSearchProduct() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword');
    //if we have a diffrent keyword than previous 
    //then set the page number to 1

    if (this.previousKeyword != theKeyWord) {
      this.pageNumber = 1;
    }
    this.previousKeyword = theKeyWord;
    console.log(theKeyWord, this.pageNumber);

    // search for the product using given keyword
    this.productService.searchProductsPaginate(this.pageNumber - 1, this.size, theKeyWord).subscribe(this.processResult());
  }

  updatePageSize(newSize: number) {
    this.size = newSize;
    this.pageNumber = 1;
    //refrech the page view
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
