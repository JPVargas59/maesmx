import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentComponent} from './student.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {FillProfileComponent} from "./fill-profile/fill-profile.component";
import {ComponentsModule} from "../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {CustomFormsModule} from "../forms/custom-forms.module";
import { SchedulesComponent } from './schedules/schedules.component';
import { StudentNavComponent } from './student-nav/student-nav.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'schedules', component: SchedulesComponent},
      {path: 'fill-profile', component: FillProfileComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  declarations: [
    StudentComponent,
    HomeComponent,
    FillProfileComponent,
    SchedulesComponent,
    StudentNavComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormlyModule,
    CustomFormsModule
  ]
})
export class StudentModule {
}
