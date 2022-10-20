import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserInfo} from "../models/UserInfo";
import {DatabaseService} from "../services/database.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  userInfo!: UserInfo;

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.user$.subscribe(user => {
      // console.log(!user, !(user?.name ?? false))
      this.userInfo = user!
      // @ts-ignore
      if (!user && !(user?.name ?? false) || !(user?.photoURL ?? false)) {
        // this.router.navigate(['/student/fill-profile']);
      }
    });
  }

  ngOnInit(): void {

  }

  onSubmit(value: any) {
    console.log(value);
  }

  signOut() {
    this.userService.signOut();
  }

}
