import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PeerInfo} from "../models/UserInfo";
import {PeerService} from "../services/peer.service";

@Component({
  selector: 'app-coordi',
  templateUrl: './coordi.component.html',
  styleUrls: ['./coordi.component.scss']
})
export class CoordiComponent implements OnInit {

  peerInfo$: Observable<PeerInfo | null>;

  constructor(
    private peerService: PeerService
  ) {
    this.peerInfo$ = this.peerService.peer$;
  }

  ngOnInit(): void {
  }

}
