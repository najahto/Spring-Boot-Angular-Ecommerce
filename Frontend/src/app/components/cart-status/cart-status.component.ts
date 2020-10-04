import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalprice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // subscribe to the cart totalPrice 
    this.cartService.totalPrice.subscribe(
      data => this.totalprice=data
    );
    // subscribe to the cart totalQunatity
    this.cartService.totalQuntity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
