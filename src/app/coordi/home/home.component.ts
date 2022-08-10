import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {PeerService} from "../../services/peer.service";
import {Settings} from "../../models/Settings";
import {UtilsService} from "../../services/utils.service";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
