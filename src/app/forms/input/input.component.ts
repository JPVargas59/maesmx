import { Component, OnInit } from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends FieldType<FieldTypeConfig> {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
