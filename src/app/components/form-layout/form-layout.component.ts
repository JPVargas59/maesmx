import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent implements OnInit {

  @Input() title: string = ''
  @Input() description: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
