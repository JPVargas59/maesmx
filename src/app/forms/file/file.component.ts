import { Component, OnInit } from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";
import {UserService} from "../../services/user.service";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent extends FieldType<FieldTypeConfig> implements OnInit {

  src!: HTMLInputElement;
  target!: HTMLImageElement;
  constructor(
    private userService: UserService,
    private database: DatabaseService
  ) {
    super();
    // when image is loaded, set the src of the image where you want to display it
  }

  ngOnInit(): void {
    this.target = document.getElementById("imageUrl") as HTMLImageElement;
    this.src = document.getElementById("fileInput") as HTMLInputElement;

    this.src.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files![0];
      this.database.uploadFile(file, 'users/' + localStorage.getItem('email') + '/photo').then(url => {
        // this.target.src = url;
        this.database.updateUserInfo(localStorage.getItem('uid'), {photoURL: url});
      });
    })

    this.userService.user$.subscribe(user => {
      if (user && user.photoURL) {
        this.target.src = user.photoURL;
      }
    })
  }

  chooseFile() {
    const fileInput = document.getElementById('fileInput')!;
    fileInput.click();
    // upload the image to firebase storage and update user profile

  }


}
