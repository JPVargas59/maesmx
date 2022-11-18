import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { FormGroup } from '@angular/forms';
import { HelpRequest, Status } from '../../models/HelpRequest';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PeerInfo } from 'src/app/models/UserInfo';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register-request-modal',
  templateUrl: './register-request-modal.component.html',
  styleUrls: ['./register-request-modal.component.scss'],
})
export class RegisterRequestModalComponent implements OnInit {
  form = new FormGroup({});
  model: HelpRequest | undefined;
  fields: FormlyFieldConfig[] = [
    {
      key: 'subject',
      type: 'select',
      templateOptions: {
        label: 'Materia',
        placeholder: 'Materia',
        disabled: false,
        required: true,
      },
    },
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comentario',
        placeholder: 'Agrega un comentario',
        required: false,
      },
    },
  ];

  subjects!: Array<any>;

  @Input() isModalActive: boolean | undefined;
  @Input() open = true;

  @Input() test: string | undefined;
  @Input() mae!: PeerInfo;

  rating = 5;

  constructor(
    private databaseService: DatabaseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let time = this.databaseService.timestamp;

    this.model = {
      userInfo: this.userService.userInfo!,
      subject: { id: '', name: '' },
      createdAt: time,
      updatedAt: time,
      comment: '',
      rating: 5,
      peerInfo: this.mae,
      resolvedAt: time,
      status: Status.RESOLVED,
    };
  }

  ngOnChanges(): void {
    this.databaseService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;

      if (subjects) {
        //@ts-ignore
        this.fields[0].templateOptions?.options = subjects.map((subject) => {
          return { key: subject.id, value: subject.name };
        });
      }
    });
    /*
    if (this.requestId) {
      this.databaseService.getHelpRequest(this.requestId).subscribe(request => {
        console.log(request);
        this.model = request;
      })
    }
    */
  }

  async onSubmit(value: HelpRequest) {
    this.model!.rating = this.rating;
    this.model!.subject = this.subjects.find((subject) => {
      return subject.id == this.model?.subject;
    });

    await this.databaseService.addResolvedRequest(this.model!);
    this.open = false;

    alert('Se registró a asesoría con éxito');
    window.location.reload();
  }

  // TODO: Agregar opción para agregar comentario de retroalimentación a BD
  async onResolve() {
    this.model!.resolvedAt = this.databaseService.timestamp;
    this.model!.status = Status.RESOLVED;
    // await this.databaseService.updateHelpRequest(this.requestId!, this.model!);
    await this.databaseService.updateUserInfo(this.model?.userInfo.uid, {
      activeRequest: this.databaseService.deleteField,
    });
    alert(
      `Registramos asesoria dde ${this.model?.userInfo.name} con ${
        this.model?.peerInfo?.name
      } para la materia ${
        this.model?.subject.name
      } el dia ${this.model?.updatedAt?.toDate()}`
    );
  }

  registerRequest(): void {
    console.log('Registrar asesoría!');
  }
}
