import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserInfo} from "../../models/UserInfo";
import {DatabaseService} from "../../services/database.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: UserInfo;

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService
  ) {
    this.userService.user$.subscribe(user => this.user = user!);
  }

  ngOnInit(): void {

  }

  onSubmit(value: any) {
    console.log(value);
  }

}
