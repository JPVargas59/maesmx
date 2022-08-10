import { Component, OnInit } from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends FieldType<FieldTypeConfig> {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
