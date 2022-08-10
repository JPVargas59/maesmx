import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {DatabaseService} from "../../services/database.service";
import {PeerInfo} from "../../models/UserInfo";
import {UserService} from "../../services/user.service";
import {UtilsService} from "../../services/utils.service";
import {WeekDays, WeekDaysTranslate} from "../../models/Settings";
import {PeerSchedule} from "../../models/PeerSchedule";


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

  form = new FormGroup({});
  model = {
    subject: undefined,
    day: undefined,
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'day',
      type: 'select',
      templateOptions: {
        label: 'Dia de la semana',
        options: []
      }
    },
    {
      key: 'subject',
      type: 'select',
      templateOptions: {
        label: 'Materia',
        options: []
      }
    }
  ]

  schedules!: PeerSchedule[];

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.userService.setting$.subscribe(settings => {
      if (!settings) return
      this.fields[0].templateOptions!.options = settings!.weekDays.map(day => {
        return {
          label: WeekDaysTranslate[day],
          value: day
        }
      })
    })
    this.databaseService.getSubjects().subscribe(subjects => {
      this.fields[1].templateOptions!.options = subjects.map(subject => {
        return {
          label: subject.name,
          value: subject.id
        }
      })
    })
  }

  onSubmit() {
    if (!this.model.day || !this.model.subject) alert('Por favor escoge una opción del formulario')
    else {
      this.databaseService.getSchedules(this.model.day!, this.model.subject!).subscribe(peers => {
        console.log(this.model.day!, this.model.subject!, peers)
        this.schedules = peers;
      })
    }
  }

  translateHour(hour: string) {
    return this.utilsService.hourToString(Number(hour))
  }

}
