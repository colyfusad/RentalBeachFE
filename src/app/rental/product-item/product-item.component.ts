import { Component, Input, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { Product } from '../../../model/product';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RentalItem } from '../../../model/rentalitem';
import { Rental} from '../../../model/rental';
import { RentalServiceService } from '../../services/rental/rental-service.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit{
  @Input() product!: Product;
  userId = this.userService.getCurrentUserId();

  constructor(private httpService: HttpServiceService, private cartService: CartService,
    private rentalService: RentalServiceService,
    private userService: UserServiceService){}
    

  ngOnInit(): void {
    
  }

  addToCart(product: Product){
    console.log("check: ", this.userId);
    this.rentalService.availableCart(this.userId).subscribe(res => {
      if (res == false){
        this.addRental();
      }
    })
    if (product.quanityAvailable >= 1){
      this.cartService.addToCart(product);
      console.log("Gio hang moi them 1: ", this.cartService.getCart());
      alert("Thêm sản phẩm '" + product.name + "' vào giỏ hàng thành công!");
    }else{
      alert("Sản phẩm '" + product.name + "' đã hết hàng!")
    }
  }

  addRental(){
    let rental: Rental;
    const myDate = new Date();
    const rentalDate: string = myDate.toISOString().slice(0, -1);
    var userId = this.userService.getCurrentUserId();
    rental = new Rental(userId, rentalDate, rentalDate, 0, 1);

    this.rentalService.addRental(rental).subscribe(
      (response) => {
      // this.router.navigate(['/admin/products']);
      alert("Thêm hóa đơn thành công!");
    }, 
    (error) => {
      alert("Thêm hóa đơn thất bại: ");
    });
  }

  addRentalItem(product: Product){
    let rentalItem: RentalItem;
    rentalItem.productId = product.id;
    rentalItem.quanity = product.quanityAvailable;
    rentalItem.pricePerDay = product.pricePerDay;
    rentalItem.totalPrice = rentalItem.quanity * rentalItem.pricePerDay;
  }
}
  