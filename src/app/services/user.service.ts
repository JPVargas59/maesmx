import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PeerInfo, UserInfo} from "../models/UserInfo";
import {PeerSession} from "../models/PeerSession";
import {Settings} from "../models/Settings";
import {DatabaseService} from "./database.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);
  private settings: BehaviorSubject<Settings | null> = new BehaviorSubject<Settings | null>(null);

  get user$(): BehaviorSubject<UserInfo | null> {
    return this.user;
  }

  get userInfo(): UserInfo | null {
    return this.user.value;
  }


  get setting$(): BehaviorSubject<Settings | null> {
    return this.settings;
  }

  get settingsInfo(): Settings | null {
    return this.settings.value;
  }

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {
    this.databaseService.getUserInfo().subscribe(info => this.user.next(info));
    this.databaseService.getSettings().subscribe(settings => this.settings.next(settings));
  }

  signOut() {
    this.authService.signOut();
  }
}
