import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../../services/http-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Categori } from '../../../../../model/categori';
import { CategoryService } from '../../../../services/category/category.service';
import { Observable } from 'rxjs';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{
  isSubmit: boolean = false;
  public categoryList: Observable<Categori[]>;
  // categoryList: Categori[] = [];
  productAdd = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    pricePerDay: ['', Validators.required],
    quanityAvailable: ['', Validators.required],
    imageUrl: [''],
    categoriId: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    private httpService: HttpServiceService, 
    private router: Router,
    private categoryService: CategoryService){}

  ngOnInit(): void {
    // this.httpService.getCategories().subscribe(res => {
    //   console.log(res.result);
    //   this.categoryList = res.result;
    // });
    this.categoryList = this.httpService.getCategories();
    console.log(this.categoryList);

    this.categoryList.subscribe(categories => {
      console.log("Category list: ", JSON.stringify(categories, null, 2));
    });
  };

  onSubmit(): any{
    this.isSubmit = true;
    if (this.productAdd.invalid){
      return false;
    }

    this.httpService.addProduct(this.productAdd.value).subscribe(
      (response) => {
      this.router.navigate(['/admin/products']);
      alert("Thêm sản phẩm thành công!");
    }, 
    (error) => {
      alert("Thêm sản phẩm thất bại: ");
    });
  }

  get f(){
    return this.productAdd.controls;
  }
}
