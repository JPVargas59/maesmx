import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { Major } from 'src/app/models/Major';
import { DatabaseService } from "../../services/database.service";
import { Router } from "@angular/router";
import { PeerInfo, Role, UserInfo } from "../../models/UserInfo";

@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.scss']
})
export class FillProfileComponent implements OnInit {

  form = new FormGroup({});
  model: UserInfo = {
    role: Role.User,
    uid: "",
    email: localStorage.getItem('email')!,
    photo: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'photo',
      type: 'file',
      templateOptions: {
        label: 'Sube tu imagen de perfil',
        placeholder: 'Subir foto'
      }
    },
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
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Nombre',
        placeholder: 'Escribe tu nombre de pila',
        required: true,
      }
    },
    {
      key: 'lastname',
      type: 'input',
      templateOptions: {
        label: 'Apellido',
        placeholder: 'Escribe tu apellido ',
        required: true,
      }
    },
    {
      key: 'career',
      type: 'select',
      templateOptions: {
        label: 'Carrera',
        options: []
      }
    },
    {
      key: 'campus',
      type: 'select',
      templateOptions: {
        label: 'Campus',
        options: []
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
      console.log(userInfo);
      this.model = userInfo;
    })

    this.database.getMajors().subscribe(majors => {
      this.fields[4].templateOptions!.options = majors.map(majors => {
        return {
          label: majors.name,
          value: majors.id
        }
      })
    })

    this.database.getCampus().subscribe(campus => {
      this.fields[5].templateOptions!.options = campus.map(campus => {
        return {
          label: campus.name,
          value: campus.id
        }
      })
    })
  }

  onSubmit(value: any) {
    delete value.email;
    value.name = value.firstname.trim() + ' ' + value.lastname.trim();
    // update userInfo
    console.log(value)
    this.database.updateUserInfo(localStorage.getItem('uid'), value).then(() => {
      console.log('User info updated');
      alert('Información actualizada');
      this.router.navigate(['/student/home']);
    })
  }

}
