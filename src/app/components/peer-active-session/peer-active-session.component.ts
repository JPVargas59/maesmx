import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PeerInfo} from "../../models/UserInfo";
import {PeerSession} from "../../models/PeerSession";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-peer-active-session',
  templateUrl: './peer-active-session.component.html',
  styleUrls: ['./peer-active-session.component.scss']
})
export class PeerActiveSessionComponent implements OnChanges {

  @Input()
  peer!: PeerInfo | null;
  @Input()
  session!: PeerSession | null;
  showConfirmation: boolean = false;
  totalTime: number = 0;

  constructor(
    private databaseService: DatabaseService
  ) {

  }

  ngOnChanges(): void {
    this.databaseService.getCurrentUserActiveSession().subscribe(session => {
      console.log(session);
      if (session) {
        this.session = session;
      }
    })
  }

  async endSessionConfirmation() {
    // calculate current session total time and ask for confirmation
    this.totalTime = Math.floor((new Date().getTime() - this.session!.startTime.toDate().getTime()) / 1000 / 60);
    this.showConfirmation = true;
  }

  async endSession() {
    await this.databaseService.endSession(this.peer!.uid, this.session!);
    this.showConfirmation = false;
    this.totalTime = 0;
  }

}
