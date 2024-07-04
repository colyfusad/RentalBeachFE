import { Component, OnInit } from '@angular/core';
import { RentalItemsBonus } from '../../../../../model/rentalitembonus';
import { Observable } from 'rxjs';
import { RentalServiceService } from '../../../../services/rental/rental-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css'
})
export class ViewDetailComponent implements OnInit{
  public item$: Observable<RentalItemsBonus[]>;
  selectedRentalId: string;
  constructor(private rentalService: RentalServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(query => {
      this.selectedRentalId = query.get("id");
    });
    this.item$ = this.rentalService.getRentalItems(this.selectedRentalId);
  }
}
