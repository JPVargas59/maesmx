import {Component, OnInit} from '@angular/core';
import {PeerInfo, Role, UserInfo} from "../../models/UserInfo";
import {DatabaseService} from "../../services/database.service";
import {firstValueFrom, Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  model: {userName: string, userId: string} = {userName: '', userId: ''}
  fields = [
    {
      key: 'userId',
      type: 'input',
      templateOptions: {
        label: 'Matricula',
        placeholder: 'Busca un usuario por matricula',
      }
    },
    {
      key: 'userName',
      type: 'input',
      templateOptions: {
        label: 'Nombre',
        placeholder: 'Busca un usuario por nombre',
      }
    }
  ]

  user$!: Observable<PeerInfo[]>
  filteredUsers!: PeerInfo[]

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.resetFilter()
  }

  async filter() {
    if (!this.model.userName && !this.model.userId) this.resetFilter()
    this.filteredUsers = (await firstValueFrom(this.user$)).filter(user => user.name!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .includes(this.model.userName!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      )).filter(user => user.uid!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .includes(this.model.userId!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      ))
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
