import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { ActivatedRoute } from "@angular/router";
import { Announcement } from 'src/app/models/Announcement';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  announcementId: string = '';
  annnouncement: Announcement = {
    id: '',
    title: '',
    subject: '',
    roomLink: '',
    endDate: new Timestamp(0, 0),
    url: '',
  };
  announcementExists: boolean = true;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {
    this.announcementId = this.route.snapshot.params['announcementId'];

    this.databaseService.getAnnouncementById(this.announcementId).subscribe(
      a => {
        if (!a) {
          this.announcementExists = false;
        }
        this.annnouncement = a
      }
    )
  }

  ngOnInit(): void { }

  registerAttendance(){
    console.log("Registro")
    this.databaseService.addAnnouncementAssistance(this.announcementId);
    alert("Tu asistencia se registró correctamente!")
  }

}
