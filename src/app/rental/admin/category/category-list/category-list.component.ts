import { Component } from '@angular/core';
import { Categori } from '../../../../../model/categori';
import { Observable } from 'rxjs';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  public categories: Observable<Categori[]>;
  product: Categori;
  public productCategories: any[];
  
  ngOnInit(): void {
    this.getAllCategories();
  }

  constructor(private httpService: HttpServiceService, private router: Router){}

  getAllCategories(){
    this.categories = this.httpService.getCategories();
  }
  
  deleteCategory(idProduct: number){
    if (confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?")) {
      this.httpService.deleteCategory(idProduct).subscribe(
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
