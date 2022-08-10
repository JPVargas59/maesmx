import { Component, OnInit } from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldType<FieldTypeConfig> {

  constructor() {
    super();
  }


}
