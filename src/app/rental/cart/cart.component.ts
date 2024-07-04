import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../icart';
import { BrowserEventService } from '../../services/browswer/browser-event.service';
import { RentalServiceService } from '../../services/rental/rental-service.service';
import { RentalItem } from '../../../model/rentalitem';
import { Rental } from '../../../model/rental';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy, OnInit {
  items: ICart[] = [];
  startDate: Date;
  endDate: Date;
  differenceInDays: number;

  constructor(private cartService: CartService, private router: Router, 
    private browserService: BrowserEventService,
    private rentalService: RentalServiceService,
    private userService: UserServiceService) {
  }

  ngOnDestroy() {
    this.browserService.destroy();
  }

  ngOnInit(): void {
    this.cartService.loadCartFromLocalStorage();
    this.browserService.init();
    this.browserService.registerBeforeUnloadEvent(() => this.cartService.updateCartToDatabase());
    this.browserService.registerUnloadEvent(() => this.cartService.updateCartToDatabase());
    this.cartService.updateCartToDatabase()
    this.loadCartFromLocalStorage();
  }

  onStartDateChange(newValue: Date) {
    this.startDate = newValue;
    console.log("Start: ", this.startDate);
  }

  onEndDateChange(newValue: Date) {
    this.endDate = newValue;
  }

  confirmOrder(){
    const userId = this.userService.getCurrentUserId();
    const rentalDate = this.startDate.toString();
    const returnDate = this.endDate.toString();

    const rentalD = new Date(this.startDate);
    const returnD = new Date(this.endDate);

    rentalD.setHours(0, 0, 0, 0);
    returnD.setHours(0, 0, 0, 0);

    let rental: Rental;
    const differenceInTime = rentalD.getTime() - returnD.getTime();
    this.differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const totalAmount = this.sumPrice() * (-this.differenceInDays + 1);

    rental = new Rental(userId, rentalDate, returnDate, totalAmount, 2);
    console.log("rental: ", JSON.stringify(rental));
    this.rentalService.confirmOrder(rental).subscribe(
      (response) => {
        this.cartService.clearCart();
        this.cartService.clearCartFromLocalStorage();
        alert('Xác nhận đơn hàng thành công!');
        this.router.navigate(['/order']);
      },
      (error) => {
        console.error('Lỗi khi xác nhận đơn hàng:', error);
      }
    );
  }
  
  loadCartFromLocalStorage() {
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      this.items = JSON.parse(cartData);
    } else {
      this.items = [];
    }
  }

  sumQuanity(){
    let sum: number = 0;
    this.items.forEach(item => sum += item.quanity);
    return sum;
  }
    
  sumPrice(){
    let sum: number = 0;
    this.items.forEach(item => sum += (item.price * item.quanity));
    return sum;
  }

  updateItemQuantity(item: any) {
    this.items = this.items.map(i => i === item ? item : i);
    sessionStorage.setItem('cart', JSON.stringify(this.items));
    this.cartService.updateQuanity(item);
  }

  deleteItem(id: any){
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

    sessionStorage.setItem('cart', JSON.stringify(this.items));
    this.cartService.setCart(this.items);
    this.cartService.updateCartToDatabase();
  }
}