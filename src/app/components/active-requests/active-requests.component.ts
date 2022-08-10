import {Component, Input, OnInit} from '@angular/core';
import {HelpRequest, Status} from "../../models/HelpRequest";
import {Observable} from "rxjs";
import {DatabaseService} from "../../services/database.service";
import {PeerInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-active-requests',
  templateUrl: './active-requests.component.html',
  styleUrls: ['./active-requests.component.scss']
})
export class ActiveRequestsComponent implements OnInit {

  request$: Observable<HelpRequest[]>;
  @Input() peerInfo!: PeerInfo | null;

  constructor(private databaseService: DatabaseService) {
    this.request$ = this.databaseService.getActiveRequests();
  }

  ngOnInit(): void {
  }

  async acceptRequest(request: HelpRequest) {
    console.log('accept request');
    request.status = Status.ACCEPTED;
    request.peerInfo = this.peerInfo!;
    await this.databaseService.updateHelpRequest(request.id!, request);
  }

}
