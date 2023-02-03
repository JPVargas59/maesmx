import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/Announcement';
import { Comment } from '../../models/Comment';
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
  today = new Date()

  open = false;
  announcement$: Observable<Announcement[]>;
  anouncements: Announcement[] = [];
  selectedAnnouncement: Announcement = {
    id: '',
    title: '',
    subject: '',
    roomLink: '',
    endDate: new Timestamp(0, 0),
    url: '',
  };

  form = new FormGroup({});
  model: Comment | undefined;
  fields: FormlyFieldConfig[] = [
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comentario',
        placeholder:
          '¿Cuáles son tus principales temas de interés? Ej. Funciones Lineales / Raices / Cuadráticas',
        required: true,
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

  ngOnInit(): void {
    this.model = {
      comment: ''
    }
  }

  // TODO: El valor de entrada del formulario no se guarda
  onSubmit(value: Comment) {
    console.log(value);
    this.databaseService.addAnnouncementComment(this.selectedAnnouncement.id, value.comment.trim());
    alert("Se registró tu comentario para el preregistro!")
  }

  registerAssistance(announcementId: string){
    console.log("Hello world!");
    this.databaseService.addAnnouncementAssistance(announcementId)
  }
}
