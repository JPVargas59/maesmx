import {Component, Input, OnChanges} from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {FormGroup} from "@angular/forms";
import {HelpRequest, Status} from "../../models/HelpRequest";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-help-request-modal',
  templateUrl: './help-request-modal.component.html',
  styleUrls: ['./help-request-modal.component.scss']
})
export class HelpRequestModalComponent implements OnChanges {

  form = new FormGroup({});
  model: HelpRequest | undefined;
  fields: FormlyFieldConfig[] = [
    {
      key: 'subject.name',
      type: 'input',
      templateOptions: {
        label: 'Materia',
        placeholder: 'Materia',
        disabled: true
      }
    },
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comentario',
        placeholder: 'Agrega un comentario',
        required: true
      }
    }
  ]
  @Input() requestId: string | undefined;
  editForm: boolean = false;

  constructor(private databaseService: DatabaseService) {

  }

  ngOnChanges(): void {
    if (this.requestId) {
      this.databaseService.getHelpRequest(this.requestId).subscribe(request => {
        console.log(request);
        this.model = request;
      })
    }
  }

  onSubmit(value: HelpRequest) {
    console.log(value);
    this.databaseService.updateHelpRequest(this.requestId!, value);
    this.editForm = false;
  }

  async onCancel() {
    this.model!.resolvedAt = this.databaseService.timestamp
    this.model!.status = Status.CANCELLED
    await this.databaseService.updateHelpRequest(this.requestId!, this.model!);
    await this.databaseService.updateUserInfo(this.model?.userInfo.uid, {activeRequest: this.databaseService.deleteField});
  }

  async onResolve() {
    this.model!.resolvedAt = this.databaseService.timestamp
    this.model!.status = Status.RESOLVED
    await this.databaseService.updateHelpRequest(this.requestId!, this.model!);
    await this.databaseService.updateUserInfo(this.model?.userInfo.uid, {activeRequest: this.databaseService.deleteField});
    alert(`Registramos asesoria dde ${this.model?.userInfo.name} con ${this.model?.peerInfo?.name} para la materia ${this.model?.subject.name} el dia ${this.model?.updatedAt?.toDate()}`)

  }

  async onMiss() {
    alert('No se ha recibido asesoria')
    this.model!.resolvedAt = this.databaseService.timestamp
    this.model!.status = Status.MISSED
    await this.databaseService.updateHelpRequest(this.requestId!, this.model!);
    await this.databaseService.updateUserInfo(this.model?.userInfo.uid, {activeRequest: this.databaseService.deleteField});
  }

  isUrl(value: string) {

  }

}
