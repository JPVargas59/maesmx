import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoordiComponent} from './coordi.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { CoordiNavComponent } from './coordi-nav/coordi-nav.component';
import {FormlyModule} from "@ngx-formly/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomFormsModule} from "../forms/custom-forms.module";
import { SearchPeerComponent } from './search-peer/search-peer.component';

const routes: Routes = [
  {
    path: '',
    component: CoordiComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  // redirect to home if no path specified
  {path: '', redirectTo: '', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    CoordiComponent,
    HomeComponent,
    CoordiNavComponent,
    SearchPeerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormlyModule,
    ReactiveFormsModule,
    CustomFormsModule
  ]
})
export class CoordiModule {
}