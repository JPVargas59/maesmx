import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PeerInfo} from "../models/UserInfo";
import {PeerSession} from "../models/PeerSession";
import {DatabaseService} from "./database.service";
import {Settings} from "../models/Settings";

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peer: BehaviorSubject<PeerInfo | null> = new BehaviorSubject<PeerInfo | null>(null);
  session: BehaviorSubject<PeerSession | null> = new BehaviorSubject<PeerSession | null>(null);
  settings: BehaviorSubject<Settings | null> = new BehaviorSubject<Settings | null>(null);

  get peer$(): BehaviorSubject<PeerInfo | null> {
    return this.peer;
  }

  get session$(): BehaviorSubject<PeerSession | null> {
    return this.session;
  }

  get peerInfo(): PeerInfo | null {
    return this.peer.value;
  }

  get peerSession(): PeerSession | null {
    return this.session.value;
  }

  get setting$(): BehaviorSubject<Settings | null> {
    return this.settings;
  }

  get settingsInfo(): Settings | null {
    return this.settings.value;
  }

  constructor(
    private databaseService: DatabaseService
  ) {
    this.databaseService.getUserInfo().subscribe(info => this.peer.next(info));
    this.databaseService.getCurrentUserActiveSession().subscribe(session => this.session.next(session));
    this.databaseService.getSettings().subscribe(settings => this.settings.next(settings));
  }
}
