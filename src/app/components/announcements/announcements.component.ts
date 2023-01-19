import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/Announcement';
import { Timestamp } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { HelpRequest, Status } from '../../models/HelpRequest';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  open = false;
  announcement$: Observable<Announcement[]>;
  anouncements: Announcement[] = [];
  selectedAnnouncement: Announcement = {
    title: '',
    subject: '',
    registerForm: '',
    endDate: new Timestamp(0, 0),
    url: '',
  };

  form = new FormGroup({});
  model: HelpRequest | undefined;
  fields: FormlyFieldConfig[] = [
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comentario',
        placeholder:
          '¿Cuáles son tus principales temas de interés? Ej. Funciones Lineales / Raices / Cuadráticas',
        required: false,
      },
    },
  ];

  selectAnnouncement(announcement: any) {
    this.selectedAnnouncement = announcement;
    this.open = true;
    console.log(this.selectedAnnouncement);
  }

  constructor(private databaseService: DatabaseService) {
    this.announcement$ = this.databaseService.getAnnouncements();
    this.announcement$.subscribe((a) => {
      this.anouncements = a;
    });
  }

  ngOnInit(): void {}

  async onSubmit(value: HelpRequest) {
    console.log('Submit!');
  }
}
