import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productId: string;

  constructor(private activeRoute: ActivatedRoute,
              private httpService: HttpServiceService){}
  
  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(
      switchMap(query => {
        this.productId = query.get("id");
        return this.httpService.getProductById(this.productId);
      })
    ).subscribe((product: Product) => {
      this.product = product;
    });
  }
}
