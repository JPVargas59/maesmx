import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { PeerInfo } from "../models/UserInfo";
import { PeerService } from "../services/peer.service";

@Component({
  selector: 'app-subject-coordi',
  templateUrl: './subject-coordi.component.html',
  styleUrls: ['./subject-coordi.component.scss']
})
export class SubjectCoordiComponent implements OnInit {

  peerInfo$: Observable<PeerInfo | null>;

  constructor(
    private peerService: PeerService
  ) {
    this.peerInfo$ = this.peerService.peer$;
  }

  ngOnInit(): void {
  }
}
