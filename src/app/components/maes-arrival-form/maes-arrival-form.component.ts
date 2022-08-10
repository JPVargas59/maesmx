import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HelpRequest} from "../../models/HelpRequest";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {PeerInfo} from "../../models/UserInfo";
import {DatabaseService} from "../../services/database.service";
import {PeerSession} from "../../models/PeerSession";

@Component({
  selector: 'app-maes-arrival-form',
  templateUrl: './maes-arrival-form.component.html',
  styleUrls: ['./maes-arrival-form.component.scss']
})
export class MaesArrivalFormComponent implements OnInit {

  form = new FormGroup({});
  model: PeerSession | {} = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'location',
      type: 'input',
      templateOptions: {
        label: 'Ubicación',
        placeholder: 'Escribe tu ubicación',
        required: true
      }
    }
  ]
  @Input() peerInfo!: PeerInfo | null;

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.model);
    if (this.peerInfo) {
      // update user info with new location
      if ("location" in this.model) {
        this.peerInfo.location = this.model.location;
        await this.databaseService.addPeerSession(this.peerInfo);
      }
    }
  }

}
