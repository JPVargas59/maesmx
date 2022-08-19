import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PeerInfo, UserInfo} from "../../models/UserInfo";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnChanges {

  @Input()
  userInfo!: PeerInfo | null;

  constructor(private database: DatabaseService, private router: Router) {

  }

  ngOnChanges(): void {
    if (this.userInfo && (!this.userInfo?.name ?? true)) {
      this.router.navigate(['/student/fill-profile']);
    }
  }

}
