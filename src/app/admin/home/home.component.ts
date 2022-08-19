import { Component, OnInit } from '@angular/core';
import {UserInfo} from "../../models/UserInfo";
import {UserService} from "../../services/user.service";
import {Settings} from "../../models/Settings";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userInfo!: UserInfo | null;
  settings!: Settings | null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.userService.userInfo
    this.userService.setting$.subscribe(settings => {
      this.settings = settings;
    })
  }

}
