import { Component, OnInit } from '@angular/core';
import {PeerService} from "../../services/peer.service";
import {PeerInfo} from "../../models/UserInfo";
import {firstValueFrom, Observable} from "rxjs";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {Settings, WeekDays} from "../../models/Settings";
import {UtilsService} from "../../services/utils.service";
import {FormGroup} from "@angular/forms";
import {Subject} from "../../models/Subject";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<PeerInfo>;
  userInfo!: PeerInfo;
  settings!: Settings;

  form: FormGroup = new FormGroup({})
  model: {subject: string} = {subject: ''}
  fields = [
    {
      key: 'subject',
      type: 'input',
      templateOptions: {
        label: 'Buscar materia',
        placeholder: 'Revisa si tiene la materia que buscas',
      }
    }
  ]

  registerRequestForm: boolean = false;

  weekdays!: WeekDays[];
  hours: number[] = [];
  maeUid: string = '';
  currentUser!: PeerInfo;

  showSchedule = true;
  showSubjects = true;

  constructor(
    private databaseService: DatabaseService,
    private peerService: PeerService,
    private route: ActivatedRoute,
    public utils: UtilsService
  ) {

    this.databaseService.getUserInfo()
      .subscribe(_user => {
        this.currentUser = _user;
      })

    this.maeUid = this.route.snapshot.params['userId'];

    this.user$ = this.databaseService.getUser(this.route.snapshot.params['userId'])
    this.user$.subscribe(user => this.userInfo = user)
    this.databaseService.getSettings().subscribe(settings => {
      this.settings = settings
      if (settings) {
        this.weekdays = settings?.weekDays!;
        this.hours = utils.range(settings!.scheduleStart, settings!.scheduleEnd, settings!.scheduleHoursGap);
      }
    })
  }

  ngOnInit(): void {
  }

  hasHourInWeekSchedule(weekDay: WeekDays, hour: number): boolean {
    const weekSchedule = Object.keys(this.userInfo?.weekSchedule ?? {});
    if (!weekSchedule.includes(weekDay)) return false
    if (!this.userInfo?.weekSchedule![weekDay]) return false;
    return this.userInfo?.weekSchedule![weekDay]?.includes(hour) ?? false;
  }

  filter(): string[] {
    const filteredSubjects = this.userInfo.subjects?.filter(subject => subject.name!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .includes(this.model.subject!.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, ""))).map(s => s.name) ?? []

    return filteredSubjects?.length == this.userInfo.subjects?.length ? [] : filteredSubjects
  }

}
