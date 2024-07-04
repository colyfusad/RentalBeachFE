import { Injectable } from '@angular/core';
import { ICart } from '../icart';
import { Product } from '../../model/product';
import { RentalServiceService } from './rental/rental-service.service';
import { RentalItem } from '../../model/rentalitem';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ICart[] = [];

  constructor(private rentalService: RentalServiceService,
              private userService: UserServiceService
  ) {this.loadCartFromLocalStorage();}

  addToCart(product: Product){
    var index = this.items.findIndex(item => item.id == product.id)
    if (index >= 0){
      this.items[index].quanity++;
    }
    else{
      var c: ICart;
      c = {
        id: product.id,
        name: product.name,
        price: product.pricePerDay,
        image: product.imageUrl,
        quanity: 1
      }
      this.items.push(c); 
    }
    this.saveCartToLocalStorage();
  }

  getCart(){
    return this.items;
  }

  setCart(items: ICart[]){
    this.items = items;
  }

  clearCart(){
    this.items = [];
    return this.items;
  }

  loadCartFromDatabase(){
    var userId = this.userService.getCurrentUserId();
    // Kiểm tra xem người dùng này trước đây đã có sản phẩm nào trong giỏ hàng chưa
    this.rentalService.getRenTalIdByUserId(userId).subscribe(respone => {
      console.log("check respone: ", respone);
      if (respone == -1){
        this.items = [];
      }
      else{
          this.rentalService.getRentalItems(respone).subscribe(res => {
            console.log("res: ", res);
            this.items = res.map(item => ({
              id: item.productId,
              name: item.productName,
              price: item.price,
              quanity: item.quanity,
              image: item.productImage || ''
            }))
          })
        }
      console.log("item lay ve: ", this.items);
    })
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  loadCartFromLocalStorage() {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    }
    console.log("KT session: ", this.items);
  }

  clearCartFromLocalStorage() {
    sessionStorage.removeItem('cart');
  }

  updateQuanity(item: any){
    console.log("item t kt: ", item)
    this.items = this.items.map(i => i.id === item.id ? item : i);
    console.log("item nef: ", this.items)
    // sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateCartToDatabase() {
    let rentalId: number;
    const userId: number = this.userService.getCurrentUserId();
    this.rentalService.getRenTalIdByUserId(userId).subscribe(
      (res) => {
        rentalId = res;
        let rentalItems: RentalItem[] = this.items.map(item => {
          return new RentalItem(
            rentalId, 
            item.id,
            item.quanity,
            item.price,
            item.price * item.quanity
          );
        });
        console.log("rentalItems: " + JSON.stringify(rentalItems));
        console.log("id: ", rentalId);
        this.rentalService.updateCart(rentalItems, rentalId).subscribe(
          (response) => {
            console.log('Cart updated in the database');
          },
          (error) => {
            console.error('Error updating cart in the database:', error);
          }
        );
      },
      (error) => {
        console.error("Error fetching rental ID:", error);
      }
    );    
  }
}
