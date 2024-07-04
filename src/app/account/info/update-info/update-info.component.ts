import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { UserServiceService } from '../../../services/user-service.service';
import { User } from '../../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrl: './update-info.component.css'
})
export class UpdateInfoComponent {
  user: User = this.userService.getCurrentUser();
  isSubmit: boolean = false;

  personEdit = this.fb.group({
    id: [this.user.id],
    userName: [this.user.userName, Validators.required],
    password: [this.user.password],
    name: [this.user.name, Validators.required],
    email: [this.user.email, Validators.required],
    phone: [this.user.phone, Validators.required],
    identifier: [this.user.identifier, Validators.required],
    address: [this.user.address, Validators.required],
    ruleId: [this.user.ruleId],
  });

  constructor(private fb: FormBuilder, 
    private httpService: HttpServiceService,
    private userService: UserServiceService,
    private router: Router){}

  get f(){
    return this.personEdit.controls;
  }

  onSubmit(): any{
    this.isSubmit = true;
    if (this.personEdit.invalid){
      return false;
    }

    this.httpService.updatePerson(this.personEdit.value).subscribe(
      (response) => {
        const formDataJson = JSON.stringify(this.personEdit.value);
        this.userService.setCurrentUser(this.user.id, this.personEdit.value);
        alert('Cập nhật thông tin cá nhân thành công');
        this.router.navigate(['/info-person']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật thông tin cá nhân:', error);
      }
    );
  }
}
