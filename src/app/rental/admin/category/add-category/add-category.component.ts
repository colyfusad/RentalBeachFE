import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Categori } from '../../../../../model/categori';
import { HttpServiceService } from '../../../../services/http-service.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  isSubmit: boolean = false;
  public categoryList: Observable<Categori[]>;
  categoryAdd = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  constructor(private fb: FormBuilder, 
    private httpService: HttpServiceService, 
    private router: Router,
    private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryList.subscribe(categories => {
      console.log("Category list: ", JSON.stringify(categories, null, 2));
    });
  };

  onSubmit(): any{
    this.isSubmit = true;
    if (this.categoryAdd.invalid){
      return false;
    }

    this.httpService.addProduct(this.categoryAdd.value).subscribe(
      (response) => {
      this.router.navigate(['/admin/categories']);
      alert("Thêm loại sản phẩm thành công!");
    }, 
    (error) => {
      alert("Thêm loại sản phẩm thất bại: ");
    });
  }

  get f(){
    return this.categoryAdd.controls;
  }
}
