import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form = new FormGroup({});
  model: {email?: string} = {};
  emailSent = false;
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }
  ];
  constructor(private router: Router, private auth: AuthService) { }

  async onSubmit(value: any) {
    console.log(value);
    this.emailSent = true;
    this.auth.sendSignInLinkToEmail(value.email)
      .catch(error => console.log(error));
  }

  ngOnInit(): void {
    this.model.email = localStorage.getItem('email') ?? undefined;
  }

}
