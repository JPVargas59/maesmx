import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input/input.component";
import {TextareaComponent} from "./textarea/textarea.component";
import {SelectComponent} from "./select/select.component";
import {RadioComponent} from "./radio/radio.component";
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {SubmitButtonComponent} from "./submit-button/submit-button.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {FormlySelectModule} from "@ngx-formly/core/select";
import { FileComponent } from './file/file.component';



@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    SelectComponent,
    RadioComponent,
    CheckboxComponent,
    SubmitButtonComponent,
    FileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'input', component: InputComponent},
        {name: 'textarea', component: TextareaComponent},
        {name: 'select', component: SelectComponent},
        {name: 'checkbox', component: CheckboxComponent},
        {name: 'radio', component: RadioComponent},
        {name: 'file', component: FileComponent},
      ],
    }),
    FormlySelectModule,
  ],
    exports: [
      InputComponent,
      TextareaComponent,
      SelectComponent,
      RadioComponent,
      CheckboxComponent,
      SubmitButtonComponent,
    ]
})
export class CustomFormsModule { }
