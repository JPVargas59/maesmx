import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PeerInfo} from "../../models/UserInfo";
import {PeerSession} from "../../models/PeerSession";
import {PeerService} from "../../services/peer.service";

@Component({
  selector: 'app-maes',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: PeerInfo | null;
  session!: PeerSession | null;

  constructor(
    private peerService: PeerService
  ) {
    this.peerService.peer$.subscribe(peer => {
      this.user = peer;
    })
    this.peerService.session$.subscribe(session => {
      this.session = session;
    })
  }

  ngOnInit(): void {

  }

}
