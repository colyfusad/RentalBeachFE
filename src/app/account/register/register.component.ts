import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  public username: string = '';
  public password: string = '';
  public re_password: string = '';

  public message: string = '';
  constructor(private userService: UserServiceService, private router: Router){}

  ngOnInit(): void {
    console.log("kq: ", this.userService.getCurrentUserId());
    if (this.userService.getCurrentUserId() != 0) {
      this.router.navigate(['/products/list']);
    }
  }

  onSubmit() {
    console.log('Tên đăng nhập:', this.username);
    console.log('Mật khẩu:', this.password);
  
    if (this.re_password === '') {
      console.log('Nhập lại mật khẩu không được để trống');
      return;
    }  

    if (this.password === '') {
      console.log('Mật khẩu không được để trống');
      return;
    }  

    if (this.password === '') {
      console.log('Mật khẩu không được để trống');
      return;
    }  

    this.register();
  }

  register(){
    if (this.password != this.re_password){
      console.log("Mật khẩu không trùng nhau");
      this.message = "Mật khẩu không trùng nhau";
      return;
    }
    this.userService.registerUser(this.username, this.password).subscribe(
      (RegisteredIn) => {
        if (RegisteredIn) {
          console.log('Đăng ký thành công!');
          this.router.navigate(['/login']);
        } else {
          console.log('Đăng ký thất bại');
          this.message = 'Tên đăng nhập đã tồn tại.';
        }
      },
      (err) => {
        console.log('Lỗi khi đăng ký', err);
        this.message = 'Đăng ký không thành công. Vui lòng thử lại sau.';
      }
    );
  }
}
