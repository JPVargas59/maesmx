import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectCoordiComponent } from './subject-coordi.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { SubjectCoordiNavComponent } from './subject-coordi-nav/subject-coordi-nav.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from '../forms/custom-forms.module';
import { ComponentsModule } from '../components/components.module';
import { CreateAnnouncementModalComponent } from './create-announcement-modal/create-announcement-modal.component';
// import { ModalComponent } from '../components/modal/modal.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectCoordiComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  // redirect to home if no path specified
  { path: '', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    HomeComponent,
    SubjectCoordiComponent,
    SubjectCoordiNavComponent,
    CreateAnnouncementModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormlyModule,
    ReactiveFormsModule,
    CustomFormsModule,
    ComponentsModule  
  ]
})
export class SubjectCoordiModule { }
