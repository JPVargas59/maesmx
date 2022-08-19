import {Component, OnInit} from '@angular/core';
import {PeerInfo, Role, UserInfo} from "../../models/UserInfo";
import {DatabaseService} from "../../services/database.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user$!: Observable<PeerInfo[]>
  filteredUsers!: PeerInfo[]

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.resetFilter()
  }

  resetFilter() {
    this.user$ = this.databaseService.getUsers()
    this.filteredUsers = []
  }

  filterMaes(users: PeerInfo[]) : PeerInfo[] {
    return users.filter(u => [Role.Admin, Role.Peer, Role.Coordi].includes(u.role))
  }

  filterMaesMissingSchedule(users: PeerInfo[]) : PeerInfo[] {
    return this.filterMaes(users).filter(u => !u.weekSchedule)
  }

  filterMaesMissingSubjects(users: PeerInfo[]) : PeerInfo[] {
    return this.filterMaes(users).filter(u => !u.subjects)
  }

}
