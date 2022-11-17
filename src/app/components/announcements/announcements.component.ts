import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/Announcement';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  open = false;
  announcement$: Observable<Announcement[]>;

  mockAnouncements = [
    {
      title: 'Herencia',
      subject: 'Programación Orientada a Objetos',
      date: new Date(2022, 11, 21),
      url: 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical-200x300.jpg',
    },
    {
      title: 'Integrales Trigonometricas',
      subject: 'Modelación Matemática Intermedia',
      date: new Date(2022, 11, 22),
      url: 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical-200x300.jpg',
    },
    {
      title: 'Análisis financiero',
      subject: 'Análisis financiero',
      date: new Date(2022, 11, 24),
      url: 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical-200x300.jpg',
    },
    {
      title: 'Análisis financiero',
      subject: 'Análisis financiero',
      date: new Date(2022, 11, 25),
      url: 'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical-200x300.jpg',
    },
  ];

  selectedAnnouncement = this.mockAnouncements[0];

  selectAnnouncement(announcement: any) {
    this.selectedAnnouncement = announcement;
    this.open = true;
    console.log(this.selectedAnnouncement);
  }

  constructor(private databaseService: DatabaseService) {
    this.announcement$ = this.databaseService.getAnnouncements();
  }

  ngOnInit(): void {}
}
