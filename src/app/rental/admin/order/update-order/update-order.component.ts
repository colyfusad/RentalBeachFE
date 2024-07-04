import { Component, OnInit } from '@angular/core';
import { RentalStatus } from '../../../../../model/rentalstatus';
import { Observable } from 'rxjs';
import { RentalServiceService } from '../../../../services/rental/rental-service.service';
import { RentalBonus } from '../../../../../model/rentalbonus';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css'
})
export class UpdateOrderComponent implements OnInit{
  public status$: Observable<RentalStatus[]>;
  selectedStatusId: number;
  selectedRentalId: string;
  
  constructor(private rentalService: RentalServiceService,
              private activeRouter: ActivatedRoute,
              private router: Router
  ){

  }

  ngOnInit(): void {
    this.status$ = this.rentalService.getRentalStatusAfter();
 
    console.log(this.status$);

    this.activeRouter.paramMap.subscribe(query => {
      this.selectedRentalId = query.get("id");
    });
  }

  onSubmit(){
    this.rentalService.updateRental(this.selectedRentalId, this.selectedStatusId).subscribe(res => {
      console.log("res: ", res);
      if (res==null){
        alert("Cập nhật thành công!")
        this.router.navigate(['/admin/order-list']);
      }
      else{
        alert("Cập nhật thất bại");
      }
    })
  }
}
