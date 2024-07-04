import { Component } from '@angular/core';
import { Product } from '../../../../../model/product';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  public products: Observable<Product[]>;
  product: Product;
  public productCategories: any[];
  
  ngOnInit(): void {
    this.getAllProduct();
    console.log("DS Product: ", JSON.stringify(this.products));
  }

  constructor(private httpService: HttpServiceService, private router: Router){}

  getAllProduct(){
    this.products = this.httpService.getProducts();
  }
  
  deleteProduct(idProduct: number){
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      this.httpService.deleteProduct(idProduct).subscribe(
        (response) => {
          alert("Xóa thành công!")
          this.router.navigate(['/admin/products']);
        },
        (error) => {
          console.error(error); 
          alert("Xóa thất bại! Vui lòng thử lại sau");
        }
      );
    }
  }
}
