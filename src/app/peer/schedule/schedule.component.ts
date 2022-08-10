import { Component, OnInit } from '@angular/core';
import {Settings, WeekDays, WeekDaysTranslate} from "../../models/Settings";
import {PeerInfo} from "../../models/UserInfo";
import {PeerService} from "../../services/peer.service";
import {UtilsService} from "../../services/utils.service";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  weekdays!: WeekDays[];
  peerInfo!: PeerInfo | null;
  originalWeekDays!: WeekDays[] | null;
  hours: number[] = [];

  constructor(
    private peerService: PeerService,
    public utilsService: UtilsService,
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.peerService.settings!.subscribe(settings => {
      if (settings) {
        this.weekdays = settings?.weekDays!;
        this.hours = utilsService.range(settings!.scheduleStart, settings!.scheduleEnd, settings!.scheduleHoursGap);
      }
      console.log(settings);
    })
    this.peerService.peer.subscribe(info => {
      this.peerInfo = info;
      console.log(info)
      // this.originalWeekDays = info?.schedule!;
      if (!this.peerInfo?.weekSchedule) {
        this.peerInfo!.weekSchedule = {};
      }
    })
  }

  ngOnInit(): void {
  }

  translateWeekDay(weekDay: WeekDays): string {
    return WeekDaysTranslate[weekDay];
  }

  addWeekDay(weekDay: WeekDays): void {
    const start = this.peerService.settingsInfo?.scheduleStart
    const end = this.peerService.settingsInfo?.scheduleEnd
    const step = this.peerService.settingsInfo?.scheduleHoursGap
    this.peerInfo!.weekSchedule![weekDay] = this.utilsService.range(start!, end!, step!);
  }

  removeWeekDay(weekDay: WeekDays): void {
    delete this.peerInfo!.weekSchedule![weekDay]
  }

  hasWeekDay(weekDay: WeekDays): boolean {
    return Object.keys(this.peerInfo?.weekSchedule ?? {}).includes(weekDay);
  }

  hasHourInWeekSchedule(weekDay: WeekDays, hour: number): boolean {
    const weekSchedule = Object.keys(this.peerInfo?.weekSchedule ?? {});
    if (!weekSchedule.includes(weekDay)) return false
    if (!this.peerInfo?.weekSchedule![weekDay]) return false;
    return this.peerInfo?.weekSchedule![weekDay]?.includes(hour) ?? false;
  }

  addHour(weekDay: WeekDays, hour: number): void {
    if (!this.hasWeekDay(weekDay)) this.peerInfo!.weekSchedule![weekDay] = [hour]
    if (!this.peerInfo?.weekSchedule) {
      this.peerInfo!.weekSchedule = {};
    }
    if (!this.peerInfo?.weekSchedule![weekDay]) {
      this.peerInfo!.weekSchedule![weekDay] = [];
    }
    if (!this.peerInfo?.weekSchedule![weekDay]!.includes(hour)) {
      this.peerInfo!.weekSchedule![weekDay]!.push(hour);
    }
    console.log(this.peerInfo?.weekSchedule);
  }

  removeHour(weekDay: WeekDays, hour: number): void {
    this.peerInfo!.weekSchedule![weekDay]!.splice(this.peerInfo!.weekSchedule![weekDay]!.indexOf(hour), 1);
    if (this.peerInfo?.weekSchedule![weekDay]!.length == 0) this.removeWeekDay(weekDay)
      console.log(this.peerInfo?.weekSchedule);
  }

  async save(): Promise<void> {
    await this.databaseService.updateUserInfo(this.peerInfo?.uid, this.peerInfo)
    await this.databaseService.saveUserSchedule(this.peerInfo!)
    alert('Horario guardado')
    this.router.navigate(['/maes'])
  }
}
