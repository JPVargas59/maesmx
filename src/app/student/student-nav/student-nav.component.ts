import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import firebase from "firebase/compat";
import {UserInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-student-nav',
  templateUrl: './student-nav.component.html',
  styleUrls: ['./student-nav.component.scss']
})
export class StudentNavComponent implements OnInit {

  user!: UserInfo;

  constructor(
    public userService: UserService
  ) {
    this.userService.user$.subscribe(user => this.user = user!)
  }

  ngOnInit(): void {
  }

}
