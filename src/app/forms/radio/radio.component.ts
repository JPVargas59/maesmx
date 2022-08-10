import { Component, OnInit } from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends FieldType<FieldTypeConfig>{

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
