import { Component } from '@angular/core';
import { Product } from '../../../model/product';
import { Observable, of, switchMap } from 'rxjs';
import { HttpServiceService } from '../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-category',
  templateUrl: './product-list-category.component.html',
  styleUrl: './product-list-category.component.css'
})
export class ProductListCategoryComponent {
  public products$: Observable<Product[]>;
  categoryId: number;
  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.httpService.getProductsToCategory(+params['categoryId']))
    ).subscribe(products => {
      this.products$ = of(products);
    });
  }
}
