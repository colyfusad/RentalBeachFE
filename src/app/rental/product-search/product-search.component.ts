import { Component } from '@angular/core';
import { Product } from '../../../model/product';
import { HttpServiceService } from '../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
  public products$: Observable<Product[]>;
  searchQuery: string = '';
  constructor(private httpService: HttpServiceService, 
    private activeRoute: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.products$ = this.activeRoute.paramMap.pipe(
      switchMap(params => {
        this.searchQuery = params.get("searchQuery") || '';
        return this.httpService.getProductsBySearchQuery(this.searchQuery);
      })
    );
  }
}
