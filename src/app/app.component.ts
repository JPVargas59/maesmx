import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'peer-learning';

  onSubmit(model: any) {
    console.log(model);
  }
}
