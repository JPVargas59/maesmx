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
  announcement$: Observable<Announcement[]>;

  mockAnouncements = [
    {
      subject: 'Programación Orientada a Objetos',
      topic: 'Herencia',
      date: new Date(2022, 11, 21),
      link: 'https://www.instagram.com/stories/maestec/2971526079639712761/',
    },
    {
      subject: 'Modelación Matemática Intermedia',
      topic: 'Integrales Trigonometricas',
      date: new Date(2022, 11, 22),
      link: 'https://www.instagram.com/stories/maestec/2971526079639712761/',
    },
    {
      subject: 'Análisis financiero',
      topic: 'Análisis financiero',
      date: new Date(2022, 11, 24),
      link: 'https://www.instagram.com/stories/maestec/2971526079639712761/',
    },
    {
      subject: 'Análisis financiero',
      topic: 'Análisis financiero',
      date: new Date(2022, 11, 25),
      link: 'https://www.instagram.com/stories/maestec/2971526079639712761/',
    },
  ];

  constructor(private databaseService: DatabaseService) {
    this.announcement$ = this.databaseService.getAnnouncements();
  }

  ngOnInit(): void {}
}
