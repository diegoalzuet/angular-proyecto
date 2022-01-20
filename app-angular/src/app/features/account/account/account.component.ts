import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  name = '';
  userName = '';
  mail = '';
  role = '';
  gender = '';
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

    let user = this.loginService.getUserInfo();
    console.log(user);

    this.name = user.user;
    this.userName = user.userName;
    this.mail = user.mail;
    this.role = user.role;
    this.gender = user.gender === 'female' ? this.gender = 'https://cdn.pixabay.com/photo/2016/11/26/18/56/exercising-1861413_1280.png' : this.gender = 'https://cdn.pixabay.com/photo/2016/11/18/23/58/jogging-1837405_1280.png';

  }

}
