import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Observable} from "rxjs";
import {Announcement} from "../../models/Announcement";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  announcement$: Observable<Announcement[]>;

  constructor(
    private databaseService: DatabaseService
  ) {
    this.announcement$ = this.databaseService.getAnnouncements();
  }

  ngOnInit(): void {
  }

}
