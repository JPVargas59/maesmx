import { Component, OnInit } from '@angular/core';
import { max, Observable, timeout } from 'rxjs';
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
  today = new Date();

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
      key: 'asistance',
      type: 'select',
      templateOptions: {
        options: [
            {label: 'A', value: 'A'},
            {label: 'F', value: 'F'},
            {label: 'RR', value: 'RR'},
            {label: 'D', value: 'D'},
            {label: 'JMT', value: 'JMT'},
            {label: 'R', value: 'R'},
            {label: 'J', value: 'J'},
        ],
      },
    },
  ];

  schedules!: PeerSchedule[];

  activePeers$: Observable<PeerInfo[]>;
  dayPeers$: Observable<PeerInfo[]>;
  attendanceList$: Observable<any[]>;
  attendanceList: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    public utilsService: UtilsService,
    public utils: UtilsService
  ) {
    this.activePeers$ = this.databaseService.getUsersWithActiveSession();
    this.dayPeers$ = this.databaseService.getUsersByWeekDays(WeekDays.Monday);
    this.attendanceList$ = this.databaseService.getTodaysAttendance();
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

    // TODO: Esto genera demasiadas lecturas?
    this.attendanceList$.subscribe(peers => this.attendanceList = peers)
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

  onChange(peer: PeerInfo){
    this.databaseService.addAttendance(peer, this.asistanceModel.asistance ?? '')
  }

  isUrl(url: string): boolean {
    // check with regex if url is valid
    const re = new RegExp('https:+');
    return re.test(url);
  }

  translateHour(hour: string) {
    return this.utilsService.hourToString(Number(hour));
  }

  getStartHour(hourArray: WeekDays[]|number[]){
    let minHour = 100;
    hourArray.forEach(hour => {
      if (Number(hour) < minHour) {
        minHour = Number(hour);
      }
    });
    
    return this.translateHour(minHour.toString());
  }

  getFinishHour(hourArray: WeekDays[]|number[]){
    let maxHour = 0;
    hourArray.forEach(hour => {
      if (Number(hour) > maxHour) {
        maxHour = Number(hour);
      }
    });
    
    return this.translateHour((maxHour + 0.5).toString());
  }

  // Revisa el estado del reporte en la colección 'attendance' para colorear la row del MAE
  // O(n)
  checkAttendance(checkPeer: PeerInfo){
    for (const peer of this.attendanceList) {
      if (checkPeer.uid === peer.uid) {
        switch (peer.report) {
          case 'A':
            return 'bg-green-50 hover:bg-green-100';
          case 'F':
            return 'bg-red-50 hover:bg-red-100';
          case 'RR':
            return 'bg-orange-50 hover:bg-orange-100';
            default:
            return 'bg-indigo-50 hover:bg-indigo-100';
        }
      }
    }
    return '';
  }
}
