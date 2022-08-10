import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {DatabaseService} from "../../services/database.service";
import {Router} from "@angular/router";
import {Role} from "../../models/UserInfo";

@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.scss']
})
export class FillProfileComponent implements OnInit {

  form = new FormGroup({});
  model = {
    email: localStorage.getItem('email'),
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Correo electrónico',
        placeholder: 'Escribe tu correo electrónico',
        disabled: true,
      }
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Nombre',
        placeholder: 'Escribe tu nombre completo',
        required: true,
      }
    },
    {
      key: 'career',
      type: 'input',
      templateOptions: {
        label: 'Carrera',
        placeholder: 'Escribe tu carrera',
      }
    },
    {
      key: 'campus',
      type: 'input',
      templateOptions: {
        label: 'Campus',
        placeholder: 'Escribe tu campus',
      }
    }, {
      key: 'role',
      type: 'select',
      defaultValue: Role.User,
      templateOptions: {
        label: 'Rol',
        placeholder: 'Selecciona tu rol',
        options: [
          {
            label: 'Alumno',
            value: Role.User
          },
          {
            label: 'MAE',
            value: Role.Peer
          },
          {
            label: 'Coordinador',
            value: Role.Coordi
          },
        ]
      }
    }
  ]

  constructor(
    private database: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.database.getUserInfo().subscribe(userInfo => {
      this.model = userInfo;
    })
  }

  onSubmit(value: any) {
    delete value.email;
    console.log(value);
    // update userInfo
    this.database.updateUserInfo(localStorage.getItem('uid'), value).then(() => {
      console.log('User info updated');
      alert('Información actualizada');
      this.router.navigate(['/student/home']);
    })
  }

}
