import { Component, OnInit } from '@angular/core';
import { RentalBonus } from '../../../model/rentalbonus';
import { Observable } from 'rxjs';
import { RentalServiceService } from '../../services/rental/rental-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { RentalStatus } from '../../../model/rentalstatus';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  public rentals$: Observable<RentalBonus[]>;
  public status$: Observable<RentalStatus[]>;
  userId: any = this.userService.getCurrentUserId();
  orderStatuses: RentalStatus[] = [];

  constructor(
    private rentalService: RentalServiceService,
    private userService: UserServiceService
  ){}

  ngOnInit(): void {
    this.rentals$ = this.rentalService.getRenTals(this.userId);
    this.status$ = this.rentalService.getRentalStatus();

    this.status$.subscribe(
      data => {
        this.orderStatuses = data;
      },
      error => {
        console.error('Error loading order statuses', error);
      }
    );
  }

  viewDetails(rental: RentalBonus): void {
    // Thêm logic để xem chi tiết đơn hàng tại đây
    console.log('Viewing details for rental:', rental);
  }

  deleteRental(rental: RentalBonus): void {
    this.rentalService.deleteRental(rental.id).subscribe(
      () => {
        console.log('Rental deleted successfully');
        // Cập nhật lại danh sách đơn hàng sau khi xóa thành công
        this.rentals$ = this.rentalService.getRenTals(this.userId);
      },
      error => {
        console.error('Error deleting rental', error);
      }
    );
  }
}
