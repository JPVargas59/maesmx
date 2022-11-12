import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { ModalComponent } from './modal/modal.component';
import { ActivePeersComponent } from './active-peers/active-peers.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HelpRequestModalComponent } from './help-request-modal/help-request-modal.component';
import { SubjectSearchComponent } from './subject-search/subject-search.component';
import { FormlyModule } from '@ngx-formly/core';
import { CustomFormsModule } from '../forms/custom-forms.module';
import { HelpRequestFormComponent } from './help-request-form/help-request-form.component';
import { ActiveRequestsComponent } from './active-requests/active-requests.component';
import { MaesArrivalFormComponent } from './maes-arrival-form/maes-arrival-form.component';
import { PeerActiveSessionComponent } from './peer-active-session/peer-active-session.component';
import { RouterModule } from '@angular/router';
import { RegisterRequestModalComponent } from './register-request-modal/register-request-modal.component';
import { PeerExplorerComponent } from './peer-explorer/peer-explorer.component';

@NgModule({
  declarations: [
    FormLayoutComponent,
    ModalComponent,
    ActivePeersComponent,
    AnnouncementsComponent,
    UserInfoComponent,
    HelpRequestModalComponent,
    SubjectSearchComponent,
    HelpRequestFormComponent,
    ActiveRequestsComponent,
    MaesArrivalFormComponent,
    PeerActiveSessionComponent,
    FooterComponent,
    RegisterRequestModalComponent,
    PeerExplorerComponent,
  ],
  exports: [
    FormLayoutComponent,
    ModalComponent,
    ActivePeersComponent,
    AnnouncementsComponent,
    HelpRequestModalComponent,
    UserInfoComponent,
    HelpRequestFormComponent,
    ActiveRequestsComponent,
    MaesArrivalFormComponent,
    PeerActiveSessionComponent,
    FooterComponent,
    RegisterRequestModalComponent,
    PeerExplorerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    CustomFormsModule,
    RouterModule,
  ],
})
export class ComponentsModule {}
