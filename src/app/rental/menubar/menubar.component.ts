import { Component, OnInit, ViewChild } from '@angular/core';
import { Categori } from '../../../model/categori';
import { Observable, map } from 'rxjs';
import { CategoryService } from '../../services/category/category.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawerContent } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements OnInit{
  public categories: Observable<Categori[]>;
  public userId$: Observable<number>;
  searchQuery: string = '';
  public userId: number = 0;

  constructor(private categoryService: CategoryService, 
    private authService: AuthService, 
    private cartService: CartService,
    private userService: UserServiceService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.userId$ = this.userService.currentUserId$;
    this.userId$.subscribe(userId => {
      this.userId = userId;
      console.log("Current userId:", userId);
    });
    this.categories = this.categoryService.getCategoryList();
    const userJson = this.userService.getCurrentUser();
  }

  onSearch(){
    if (this.searchQuery.trim() !== '') {
      this.route.navigate(['/products/search', this.searchQuery]);
    } else {
      alert('Vui lòng nhập từ khóa tìm kiếm');
    }
  }

  logOut(){
    this.cartService.updateCartToDatabase();
    this.cartService.clearCartFromLocalStorage();
    this.authService.logOut();
    this.userService.logOutClient();
    this.route.navigate(["/login"]);
  }
}
