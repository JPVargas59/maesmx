import { Component, OnInit } from '@angular/core';
import { max, Observable } from 'rxjs';
import { PeerInfo } from '../../models/UserInfo';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PeerService } from '../../services/peer.service';
import { UserService } from '../../services/user.service';
import { Settings } from '../../models/Settings';
import { UtilsService } from '../../services/utils.service';
import { DatabaseService } from '../../services/database.service';
import { PeerSchedule } from '../../models/PeerSchedule';
import { WeekDays, WeekDaysTranslate } from '../../models/Settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  asistanceForm = new FormGroup({});
  asistanceModel = {
    asistance: undefined,
  };
  asistanceFields: FormlyFieldConfig[] = [
    {
      key: 'day',
      type: 'select',
      templateOptions: {
        options: [
            {label: 'A', value: 'asistencia'},
            {label: 'F', value: 'falta'},
            {label: 'RR', value: 'retardo'},
            {label: 'D', value: 'discord'},
            {label: 'JMT', value: 'junta-mt'},
            {label: 'R', value: 'reponer'},
            {label: 'J', value: 'ausencia-justificada'},
        ],
      },
    },
  ];

  schedules!: PeerSchedule[];

  activePeers$: Observable<PeerInfo[]>;

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    public utilsService: UtilsService,
    public utils: UtilsService
  ) {
    this.activePeers$ = this.databaseService.getUsersWithActiveSession();
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

  isUrl(url: string): boolean {
    // check with regex if url is valid
    const re = new RegExp('https:+');
    return re.test(url);
  }

  translateHour(hour: string) {
    return this.utilsService.hourToString(Number(hour));
  }

  getStartHour(hourArray: WeekDays[]){
    let minHour = 100;
    hourArray.forEach(hour => {
      if (Number(hour) < minHour) {
        minHour = Number(hour);
      }
    });
    
    return this.translateHour(minHour.toString());
  }

  getFinishHour(hourArray: WeekDays[]){
    let maxHour = 0;
    hourArray.forEach(hour => {
      if (Number(hour) > maxHour) {
        maxHour = Number(hour);
      }
    });
    
    return this.translateHour((maxHour + 0.5).toString());
  }
}
