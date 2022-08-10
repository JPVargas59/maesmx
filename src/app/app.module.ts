import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";

import {ComponentsModule} from "./components/components.module";
import { HomeComponent } from './student/home/home.component';
import { LandingComponent } from './landing/landing.component';
import {CustomFormsModule} from "./forms/custom-forms.module";
import { FillProfileComponent } from './student/fill-profile/fill-profile.component';
import { environment } from '../environments/environment';
import {ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';

import {PerformanceModule} from '@angular/fire/performance';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { PERSISTENCE } from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { AngularFireAuthGuardModule} from "@angular/fire/compat/auth-guard";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormlyModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    PerformanceModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    AngularFireAuthGuardModule,
    { provide: PERSISTENCE, useValue: 'session' },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule { }
