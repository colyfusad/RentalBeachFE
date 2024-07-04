import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  public products$: Observable<Product[]>;

  constructor(private httpService: HttpServiceService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.products$ = this.httpService.getProducts();
    })
    const date: Date = new Date();
    console.log(date.toISOString());
    console.log(date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  }
}
