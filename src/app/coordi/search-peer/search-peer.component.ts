import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {Settings, WeekDays} from "../../models/Settings";
import {PeerService} from "../../services/peer.service";
import {DatabaseService} from "../../services/database.service";
import {UtilsService} from "../../services/utils.service";
import {PeerInfo, UserInfo} from "../../models/UserInfo";
import {Subject} from "../../models/Subject";

@Component({
  selector: 'app-search-peer',
  templateUrl: './search-peer.component.html',
  styleUrls: ['./search-peer.component.scss']
})
export class SearchPeerComponent implements OnInit {

  model: {
    id?: string,
    name?: string
    day?: WeekDays,
    subject?: string,
  } = {}
  form: FormGroup = new FormGroup({})
  fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'input',
      templateOptions: {
        label: 'Matricula',
        placeholder: 'Escribe la matricula del MAE',
      }
    }, {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Nombre',
        placeholder: 'Escribe el nombre del MAE',
      }
    }, {
      key: 'day',
      type: 'select',
      templateOptions: {
        label: 'Día',
        placeholder: 'Selecciona el día',
      }
    }, {
      key: 'subject',
      type: 'select',
      templateOptions: {
        label: 'Materia',
        placeholder: 'Selecciona la materia',
      }
    }
  ]
  settings!: Settings;

  result!: PeerInfo[]

  constructor(
    private peerService: PeerService,
    private databaseService: DatabaseService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.peerService.settings.subscribe(settings => {
      if (settings) this.settings = settings
      // get days from settings
      this.fields[2].templateOptions!.options = this.settings.weekDays.map(day => {
        return {
          label: this.utilsService.weekDayToDay(day),
          value: day
        }
      })

      // get subjects from databaseService
      this.databaseService.getSubjects().subscribe(subjects => {
        this.fields[3].templateOptions!.options = subjects.map(subject => {
          return {
            label: subject.name,
            value: JSON.stringify(subject)
          }
        })
      })

    });
  }

  onSubmit() {
    if (this.model.id) {
      this.databaseService.getUser(this.model.id).subscribe(user => {
        this.result = [user]
      })
    } else if (this.model.name) {
      this.databaseService.getUsersByName(this.model.name).subscribe(users => {
        this.result = users
      })
    } else if (this.model.day) {
      this.databaseService.getUsersByWeekDays(this.model.day).subscribe(users => {
        this.result = users
        this.result = this.result.map(user => {
          this.daysInSchedule(user).map(day => {
            if (day !== this.model.day) {
              // @ts-ignore
              delete user!.weekSchedule![day!]
            }
          })
          return user
        })
      })
    } else if (this.model.subject) {
      this.databaseService.getUsersBySubject(JSON.parse(this.model.subject)).subscribe(users => {
        this.result = users
      })
    }
  }

  weeklySchedule(user: PeerInfo, day: string) {
    if (!user.weekSchedule) return []
    // @ts-ignore
    return user.weekSchedule[day] || []
  }

  daysInSchedule(user: PeerInfo) {
    if (!user.weekSchedule) return []
    return Object.keys(user.weekSchedule)
  }

  resetForm() {
    this.form.reset()
    this.result = []
  }
}
