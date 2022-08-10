import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ComponentsModule} from "../components/components.module";
import { PeerNavComponent } from './peer-nav/peer-nav.component';
import { PeerComponent } from './peer.component';
import {PeerService} from "../services/peer.service";
import { SubjectsComponent } from './subjects/subjects.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {FormlyModule} from "@ngx-formly/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomFormsModule} from "../forms/custom-forms.module";

const routes: Routes = [
  {path: '', component: PeerComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'subjects', component: SubjectsComponent},
    {path: 'schedule', component: ScheduleComponent}
  ]}
];


@NgModule({
  declarations: [
    HomeComponent,
    PeerNavComponent,
    PeerComponent,
    SubjectsComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FormlyModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [PeerService]
})
export class PeerModule { }
