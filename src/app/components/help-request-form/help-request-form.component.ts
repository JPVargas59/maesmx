import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {DatabaseService} from "../../services/database.service";
import {UserInfo} from "../../models/UserInfo";
import {HelpRequest} from "../../models/HelpRequest";
import {Subject} from "../../models/Subject";

@Component({
  selector: 'app-help-request-form',
  templateUrl: './help-request-form.component.html',
  styleUrls: ['./help-request-form.component.scss']
})
export class HelpRequestFormComponent implements OnInit {

  form = new FormGroup({});
  model: HelpRequest | {} = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'subject',
      type: 'select',
      templateOptions: {
        label: 'Materia',
        options: [
          {value: '1', label: 'Matemáticas'},
          {value: '2', label: 'Lenguaje'},
          {value: '3', label: 'Ciencias'},
        ],
        required: true
      }
    },
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comentario (opcional)',
        required: false
      }
    }
  ];

  @Input() userInfo: UserInfo | undefined;
  subjects: Subject[] = [];

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.databaseService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
      this.fields[0].templateOptions!.options = subjects.map(subject => ({value: subject.id, label: subject.name}));
    })
  }

  onSubmit(value: any) {
    console.log(value);
    const subject = this.subjects.find(subject => subject.id === value.subject);
    this.databaseService.addRequest(this.userInfo!, subject!, value.comment).then(() => {
      this.form.reset();
    })
  }

}
