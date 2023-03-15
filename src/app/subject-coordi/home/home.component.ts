import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/Announcement';
const Papa = require('papaparse');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  announcement$: Observable<Announcement[]>;
  anouncements: Announcement[] = [];

  constructor(private databaseService: DatabaseService) {
    this.announcement$ = this.databaseService.getAnnouncements();
    this.announcement$.subscribe((a) => {
      this.anouncements = a;
    });
  }

  ngOnInit(): void {
  }

  openAnnouncementForm: boolean = false;

  deleteAnnouncement(id: string){
    if (confirm('¿Estás seguro de que quieres borrar este anuncio? (Se perderá el registro de asistencia)')) {
      this.databaseService.deleteAnnouncement(id);
    }
  }

  downloadAnnouncementAssistance(id: string){
    this.databaseService.getAnnouncementAssistance(id).subscribe(assistants => {
      console.log(assistants)
      const csv = Papa.unparse([
        {
          "uid": "",
          "email": "",
          "name": "",
          "career": "",
          "area": "",
          "campus": "",
          "comment": "",
        },
        ...assistants
      ]);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}.csv`;
      a.click();
    })
  }

}
