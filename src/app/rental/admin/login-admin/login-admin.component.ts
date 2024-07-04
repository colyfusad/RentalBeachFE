import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../../services/user-service.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})

export class LoginAdminComponent implements OnInit{
  public username: string = '';
  public password: string = '';

  public message: string = '';
  constructor(private userService: UserServiceService,
    private router: Router, private authService: AuthService){}

  ngOnInit(): void {

  }

  onSubmit() {
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
    this.userService.checkLoginUserAdmin(this.username, this.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
          this.authService.login();
          console.log('Đăng nhập thành công!');
          
          setTimeout(() => {
            this.router.navigate(['admin', 'products']);
          }, 1000);
          // this.router.navigate(['admin', 'products']);
          // this.router.navigateByUrl('/admin/products');
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
