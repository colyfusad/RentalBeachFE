import { Component, OnInit } from '@angular/core';
import { RentalBonus } from '../../../../../model/rentalbonus';
import { Observable } from 'rxjs';
import { RentalServiceService } from '../../../../services/rental/rental-service.service';
import { RentalStatus } from '../../../../../model/rentalstatus';
import { UserServiceService } from '../../../../services/user-service.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public rentals$: Observable<RentalBonus[]>;
  
  userId: any = this.userService.getCurrentUserId();


  constructor(private rentalService: RentalServiceService,
              private userService: UserServiceService,
              private router: Router){}

  ngOnInit(): void {
    this.rentals$ = this.rentalService.getRentalAll();
  }

  deleteRental(rentalId: number): void {
    if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      this.rentalService.deleteRentalItemByRentalId(rentalId).subscribe(
        (response) => {
          this.rentalService.deleteRental(rentalId).subscribe(
            (response) => {
              alert("Xóa thành công!")
              this.router.navigate(['/admin/order-list']);
            },
            (error) => {
              console.error(error); 
              alert("Xóa thất bại! Vui lòng thử lại sau");
            }
          );
        }
      );
      
    }
  }
}
