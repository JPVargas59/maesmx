import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passwordless-sign-in',
  templateUrl: './passwordless-sign-in.component.html',
  styleUrls: ['./passwordless-sign-in.component.scss']
})
export class PasswordlessSignInComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.verifyEmail()
      .then(_ => this.router.navigate(['/student']))
      .catch(err => console.error(err));
  }

}
