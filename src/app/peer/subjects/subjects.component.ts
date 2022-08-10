import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Subject} from "../../models/Subject";
import {filter, Observable} from "rxjs";
import {DatabaseService} from "../../services/database.service";
import {PeerService} from "../../services/peer.service";
import {Router} from "@angular/router";
import {PeerInfo} from "../../models/UserInfo";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  model: {subject: string} = {subject: ''}
  fields = [
    {
      key: 'subject',
      type: 'input',
      templateOptions: {
        label: 'Materia',
        placeholder: 'Busca una materia',
      }
    }
  ]
  subjects!: Subject[];
  peerInfo!: PeerInfo;
  filteredSubjects!: Subject[];

  constructor(
    private databaseService: DatabaseService,
    private peerService: PeerService,
    private router: Router
  ) {
    this.databaseService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.filteredSubjects = subjects;
    })
    this.peerService.peer.subscribe(peerInfo => {
      if (!peerInfo?.subjects) peerInfo!.subjects = []
      this.peerInfo = peerInfo!;
      console.log(this.peerInfo)
    })
  }

  ngOnInit(): void {

  }

  filter() {
    if (!this.model.subject) this.filteredSubjects = this.subjects
    this.filteredSubjects = this.subjects.filter(subject => subject.name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .includes(this.model.subject!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  ))
  }

  addSubject(subject: Subject) {
    this.peerInfo.subjects!.push(subject)
  }

  removeSubject(subject: Subject) {
    this.peerInfo.subjects!.splice(this.peerInfo.subjects!.indexOf(subject), 1)
  }

  hasSubject(subject: Subject): boolean {
    return !!this.peerInfo!.subjects?.find(s => s.id === subject.id)
  }

  async save() {
    const peer = this.peerService.peerInfo
    await this.databaseService.updateUserInfo(peer?.uid, peer)
    await this.databaseService.saveUserSchedule(peer!)
    alert('Materias guardado')
    this.router.navigate(['/maes'])
  }

}
