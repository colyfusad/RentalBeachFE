import { Component } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {
  userIdx: number = this.userService.getCurrentUserId();
  user: any = this.userService.getCurrentUser();
  passwordData = {
    userId: this.userIdx,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private httpService: HttpServiceService,
              private userService: UserServiceService,
              private router: Router) {}

  onSubmit(): void {
    if (this.passwordData.currentPassword != this.user.password){
      alert('Mật khẩu hiện tại không chính xác.');
      return;
    }

    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    this.httpService.updatePassword(this.passwordData).subscribe(response => {
      this.user.password = this.passwordData.newPassword;
      this.userService.setCurrentUser(this.userIdx, this.user);
      alert('Đổi mật khẩu thành công.');
      this.router.navigate(['/info-person']);
    }, error => {
      alert('Hệ thống lỗi, vui lòng thử lại sau.');
    });
  }
}
