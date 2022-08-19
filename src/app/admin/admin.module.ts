import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import {ComponentsModule} from "../components/components.module";
import { UsersComponent } from './users/users.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent}
  ]}
]


@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    AdminNavComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
    FormlyModule
  ]
})
export class AdminModule { }
