import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import {ComponentsModule} from "../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {AppModule} from "../app.module";
import {Route, RouterModule} from "@angular/router";
import { AuthComponent } from './auth.component';
import {CustomFormsModule} from "../forms/custom-forms.module";
import { PasswordlessSignInComponent } from './passwordless-sign-in/passwordless-sign-in.component';

const routes: Route[] = [
  {path: '', component: AuthComponent, children: [
    {path: 'sign-in', component: SignInComponent},
    {path: 'verification', component: PasswordlessSignInComponent},
    {path: '**', redirectTo: 'sign-in'}
  ]}
]


@NgModule({
  declarations: [
    SignInComponent,
    AuthComponent,
    PasswordlessSignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    FormlyModule,
    CustomFormsModule
  ]
})
export class AuthModule { }
