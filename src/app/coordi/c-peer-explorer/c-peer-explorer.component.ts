import { Component, OnInit } from '@angular/core';
import { max, Observable, timeout } from 'rxjs';
import { PeerInfo } from '../../models/UserInfo';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DatabaseService } from '../../services/database.service';
import { PeerSchedule } from '../../models/PeerSchedule';
import { UserService } from '../../services/user.service';
import { UtilsService } from '../../services/utils.service';
import { WeekDays, WeekDaysTranslate } from '../../models/Settings';

@Component({
  selector: 'app-c-peer-explorer',
  templateUrl: './c-peer-explorer.component.html',
  styleUrls: ['./c-peer-explorer.component.scss']
})
export class CPeerExplorerComponent implements OnInit {
  today = new Date();
  weekDaysArray = [WeekDays.Sunday, WeekDays.Monday, WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday]

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
        options: [],
      },
    },
    {
      key: 'subject',
      type: 'select',
      templateOptions: {
        label: 'Materia',
        options: [],
      },
    },
  ];

  schedules!: PeerSchedule[];

  activePeers$: Observable<PeerInfo[]>;
  dayPeers$: Observable<PeerInfo[]>;

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    public utilsService: UtilsService,
    public utils: UtilsService
  ) {
    this.activePeers$ = this.databaseService.getUsersWithActiveSession();
    this.dayPeers$ = this.databaseService.getUsersByWeekDays(this.weekDaysArray[this.today.getDay()]);
  }

  ngOnInit(): void {
    this.userService.setting$.subscribe((settings) => {
      if (!settings) return;
      this.fields[0].templateOptions!.options = settings!.weekDays.map(
        (day) => {
          return {
            label: WeekDaysTranslate[day],
            value: day,
          };
        }
      );
    });
     
    this.databaseService.getSubjects().subscribe((subjects) => {
      this.fields[1].templateOptions!.options = subjects.map((subject) => {
        return {
          label: subject.name,
          value: subject.id,
        };
      });
    });
  }

  onSubmit() {
    if (!this.model.day || !this.model.subject)
      alert('Por favor escoge una opción del formulario');
    else {
      this.databaseService
        .getSchedules(this.model.day!, this.model.subject!)
        .subscribe((peers) => {
          console.log(this.model.day!, this.model.subject!, peers);
          this.schedules = peers;
        });
    }
  }

  translateHour(hour: string) {
    return this.utilsService.hourToString(Number(hour));
  }

  getStartHour(hourArray: WeekDays[] | number[]) {
    let minHour = 100;
    hourArray.forEach(hour => {
      if (Number(hour) < minHour) {
        minHour = Number(hour);
      }
    });

    return this.translateHour(minHour.toString());
  }

  getFinishHour(hourArray: WeekDays[] | number[]) {
    let maxHour = 0;
    hourArray.forEach(hour => {
      if (Number(hour) > maxHour) {
        maxHour = Number(hour);
      }
    });

    return this.translateHour((maxHour + 0.5).toString());
  }

}
