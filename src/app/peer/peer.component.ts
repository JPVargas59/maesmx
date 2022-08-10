import {Component, OnInit} from '@angular/core';
import {PeerService} from "../services/peer.service";
import {PeerInfo} from "../models/UserInfo";
import {Observable} from "rxjs";

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.scss']
})
export class PeerComponent implements OnInit {

  peerInfo$: Observable<PeerInfo | null>;

  constructor(
    private peerService: PeerService
  ) {
    this.peerInfo$ = this.peerService.peer$;
  }

  ngOnInit(): void {
  }

}
