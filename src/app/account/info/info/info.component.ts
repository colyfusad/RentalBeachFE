import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user';
import { UserServiceService } from '../../../services/user-service.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
  public user$: User;
  constructor(private userService: UserServiceService){
    
  }
  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
    console.log("ko: ", this.user$.userName);
  }

  editUserInfo(){}
}
