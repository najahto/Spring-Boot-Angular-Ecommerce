import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/api/products';
  private categoriesURL = 'http://localhost:8080/api/categories';
  // inject httpClient
  constructor(private httpClient: HttpClient) { }

  getProductsPaginate(page:number ,size:number,theCategoryId: number): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`+`&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
  getProducts(theCategoryId: number): Observable<Product[]> {
    console.log(theCategoryId);
    const searchUrl = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;
    return this.products(searchUrl);
  }

  searchProduct(theKeyWord:string): Observable<Product[]>{
    console.log(theKeyWord);
    const searchUrl = `${this.baseURL}/search/findByNameContaining?name=${theKeyWord}`;
    return this.products(searchUrl);
  }

  searchProductsPaginate(page:number ,size:number,theKeyWord: string): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseURL}/search/findByNameContaining?name=${theKeyWord}`+`&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  products(searchUrl:string){
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoriesURL).pipe(
      map(response => response._embedded.category)
    );
  }
  getProduct(theProductId:number) : Observable<Product> {
    const productUrl=`${this.baseURL}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  
}

// Maps JSON data from REST API to our TS Objects 
interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page:{
    size:number;
    totalElements:number;
    totalPages:number;
    number:number;
  }
}

interface GetResponseCategory {
  _embedded: {
    category: Category[];
  }
}


