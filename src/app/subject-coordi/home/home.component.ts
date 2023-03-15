import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../models/Announcement';

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
    this.databaseService.deleteAnnouncement(id);
  }

}
