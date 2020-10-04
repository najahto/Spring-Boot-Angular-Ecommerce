import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuntity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the itemm in the cart based on the item id 
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id == theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      //just add the item 
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity 
    this.computeCartTotals();


  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    //publish the new values ... all subscribers will receive the new data
    // next() will publish/send the event
    this.totalPrice.next(totalPriceValue);
    this.totalQuntity.next(totalQuantityValue);

    //log cart for dubugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

  }
  logCartData(totalPrice: number, totalQuantity: number) {
    console.log('contents of the cart');
    for (let cart of this.cartItems) {
      const subtotalPrice = cart.quantity * cart.unitPrice;
      console.log(`name= ${cart.name} , quantity=${cart.quantity} , unitprice=${cart.unitPrice},subtotal =${subtotalPrice}`);
    }
    // toFixed(2) two digits after decimal 
    console.log(`totalPrice=${totalPrice.toFixed(2)},totalQty =${totalQuantity}`);
    console.log('------------');
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity == 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    // get the index of item in the array   
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
