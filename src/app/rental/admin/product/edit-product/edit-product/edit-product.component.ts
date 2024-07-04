import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categori } from '../../../../../../model/categori';
import { HttpServiceService } from '../../../../../services/http-service.service';
import { CategoryService } from '../../../../../services/category/category.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  isSubmit: boolean = false;
  public categoryList: Observable<Categori[]>;
  routeId: string = null;
  
  productEdit = this.fb.group({
    id: [this.routeId],
    name: ['', Validators.required],
    description: [''],
    pricePerDay: ['', Validators.required],
    quanityAvailable: ['', Validators.required],
    imageUrl: [''],
    categoryId: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    private httpService: HttpServiceService, 
    private router: Router,
    private aciveRouter: ActivatedRoute,
    private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryList = this.categoryService.getCategoryList();

    this.aciveRouter.paramMap.subscribe(query => {
      let id = query.get("id");
      this.httpService.getProductById(id).subscribe(res => {
        let pr = res;
        this.productEdit = this.fb.group({
          id: [id],
          name: [pr.name, Validators.required],
          description: [pr.description],
          pricePerDay: [pr.pricePerDay, Validators.required],
          quanityAvailable: [pr.quanityAvailable, Validators.required],
          imageUrl: [pr.imageUrl],
          categoryId: [pr.categoryId, Validators.required]
        });
      })
    })
  }

  onSubmit(): any{
    this.isSubmit = true;
    if (this.productEdit.invalid){
      return false;
    }

    this.httpService.updateProduct(this.productEdit.value).subscribe(
      (response) => {
        alert('Cập nhật thông tin sản phẩm thành công');
        this.router.navigate(['/admin/products']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật thông tin cổ phiếu:', error);
      }
    );
  }

  get f(){
    return this.productEdit.controls;
  }
}
