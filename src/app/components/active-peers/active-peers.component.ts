import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PeerInfo} from "../../models/UserInfo";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-active-peers',
  templateUrl: './active-peers.component.html',
  styleUrls: ['./active-peers.component.scss']
})
export class ActivePeersComponent implements OnInit {

  activePeers$: Observable<PeerInfo[]>;

  constructor(private databaseService: DatabaseService) {
    this.activePeers$ = this.databaseService.getUsersWithActiveSession();
  }

  ngOnInit(): void {
  }

  isUrl(url: string): boolean {
    // check with regex if url is valid
    const re = new RegExp('https:+')
    return re.test(url);
  }

}
