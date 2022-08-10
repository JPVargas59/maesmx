import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-subject-search',
  templateUrl: './subject-search.component.html',
  styleUrls: ['./subject-search.component.scss']
})
export class SubjectSearchComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  subjects: FormlyFieldConfig[] = [
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
    }
  ];
  days: FormlyFieldConfig[] = [
    {
      key: 'day',
      type: 'select',
      templateOptions: {
        label: 'Dias',
        options: [
          {value: '1', label: 'Lunes'},
          {value: '2', label: 'Martes'},
          {value: '3', label: 'Miercoles'},
        ],
        required: true
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    console.log(value);
  }

}
