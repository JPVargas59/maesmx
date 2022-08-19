import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userInfo$!: Observable<UserInfo | null>;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.userService.user$
  }

}
