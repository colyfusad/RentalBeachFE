import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { FormsModule } from '@angular/forms';
import { ICart } from '../../icart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public username: string = '';
  public password: string = '';

  public message: string = '';
  constructor(private userService: UserServiceService, 
    private cartService: CartService,
    private router: Router){}

  ngOnInit(): void {
    if (this.userService.getCurrentUserId() !== 0) {
      // Nếu đã đăng nhập, chuyển hướng sang trang sản phẩm
      this.router.navigate(['/products/list']);
    }
  }

  onSubmit() {
    console.log('Tên đăng nhập:', this.username);
    console.log('Mật khẩu:', this.password);
  
    if (this.username === '') {
      console.log('Tên đăng nhập không được để trống');
      return;
    }  

    if (this.password === '') {
      console.log('Mật khẩu không được để trống');
      return;
    }  

    this.login();
  }

  login() {
    this.userService.checkLoginUser(this.username, this.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
          this.cartService.loadCartFromDatabase();
          console.log('Đăng nhập thành công!');
          this.router.navigate(['products', 'list']);
        } else {
          console.log('Đăng nhập thất bại');
          this.message = 'Tên đăng nhập hoặc mật khẩu không chính xác.';
        }
      },
      (err) => {
        console.log('Lỗi khi kiểm tra đăng nhập', err);
        this.message = 'Đăng nhập không thành công. Vui lòng thử lại sau.';
      }
    );
  }
}
