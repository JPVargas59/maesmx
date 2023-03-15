import { Component, OnInit } from '@angular/core';
import { max, Observable, timeout } from 'rxjs';
import { PeerInfo } from '../../models/UserInfo';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UtilsService } from '../../services/utils.service';
import { DatabaseService } from '../../services/database.service';
import { PeerSchedule } from '../../models/PeerSchedule';
import { WeekDays, WeekDaysTranslate } from '../../models/Settings';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss']
})
export class AttendanceTableComponent implements OnInit {

  openReportModal: boolean = false;

  today = new Date();
  weekDaysArray = [WeekDays.Sunday, WeekDays.Monday, WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday]

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

  dayPeers$: Observable<PeerInfo[]>;
  attendanceList$: Observable<any[]>;
  attendanceList: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    public utilsService: UtilsService,
    public utils: UtilsService
  ) {
    this.dayPeers$ = this.databaseService.getUsersByWeekDays(this.weekDaysArray[this.today.getDay()]);
    this.attendanceList$ = this.databaseService.getTodaysAttendance();
  }

  ngOnInit(): void {
    // TODO: Esto genera demasiadas lecturas?
    this.attendanceList$.subscribe(peers => this.attendanceList = peers)
  }

  onChange(peer: PeerInfo){
    this.databaseService.addAttendance(peer, this.asistanceModel.asistance ?? '')
  }

  // TODO: Aquí se debería de poder pasar menos información
  getTodaySchedule(peer: PeerInfo){
    switch (this.today.getDay()) {
      case 1:
        return peer.weekSchedule?.monday
      case 2:
        return peer.weekSchedule?.tuesday
      case 3:
        return peer.weekSchedule?.wednesday
      case 4:
        return peer.weekSchedule?.thursday
      case 5:
        return peer.weekSchedule?.friday
      case 6:
        return peer.weekSchedule?.saturday
      case 0:
        return peer.weekSchedule?.sunday
      default:
        return peer.weekSchedule?.monday
    }
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
