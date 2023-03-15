import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Announcement } from 'src/app/models/Announcement';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-create-announcement-modal',
  templateUrl: './create-announcement-modal.component.html',
  styleUrls: ['./create-announcement-modal.component.scss']
})
export class CreateAnnouncementModalComponent implements OnInit {

  src!: HTMLInputElement;
  target!: HTMLImageElement;

  form = new FormGroup({});
  model: any = {
    title: '',
    subject: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      name: 'title',
      type: 'input',
      templateOptions: {
        label: 'Titulo',
        placeholder: 'Titulo de la sesión',
        required: true,
      },
      className: 'col-span-6'
    },
    {
      key: 'subject',
      name: 'subject',
      type: 'input',
      templateOptions: {
        label: 'Tema',
        placeholder: 'Tema de la sesión',
        required: true,
      },
      className: 'col-span-6'
    },
    {
      key: 'hour',
      type: 'input',
      templateOptions: {
        label: 'Hora (24 hrs)',
        placeholder: (new Date().getHours()).toString(),
        type: 'number',
        min: 0,
        max: 23,
        required: true,
      },
      className: 'col-span-3'
    },
    {
      key: 'minute',
      type: 'input',
      templateOptions: {
        label: 'Minuto',
        placeholder: (new Date().getMinutes()).toString(),
        type: 'number',
        min: 0,
        max: 59,
        required: true,
      },
      className: 'col-span-3'
    },
    {
      key: 'day',
      type: 'input',
      templateOptions: {
        label: 'Día',
        placeholder: (new Date().getDate()).toString(),
        type: 'number',
        min: 0,
        max: 31,
        required: true,
      },
      className: 'col-span-2'
    },
    {
      key: 'month',
      type: 'input',
      templateOptions: {
        label: 'Mes',
        placeholder: (new Date().getMonth() + 1).toString(),
        type: 'number',
        min: 1,
        max: 12,
        required: true,
      },
      className: 'col-span-2'
    },
    {
      key: 'year',
      type: 'input',
      templateOptions: {
        label: 'Año',
        placeholder: (new Date().getFullYear()).toString(),
        type: 'number',
        min: 2020,
        max: new Date().getFullYear() + 1,
        required: true,
      },
      className: 'col-span-2'
    },
    {
      id: 'announcementPosterUpload',
      name: 'announcementPosterUpload',
      key: 'file',
      type: 'file',
      templateOptions: {
        label: 'Poster de la sesión',
      },
      className: 'col-span-6 announcementPosterUpload'
    },

  ];

  @Input() isModalActive: boolean | undefined;
  @Input() open = true;

  constructor(
    private database: DatabaseService
  ) { }

  // Usada para desactivar el boton de submit hasta que se sube la imagen a la BD
  loading: boolean = false;

  ngOnChanges(changes: SimpleChanges) {

    this.target = document.getElementById("imageUrl") as HTMLImageElement;
    this.src = document.getElementById("fileInput") as HTMLInputElement;

    this.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvf9wn1WvKWCp2eCV0atTl56ONzL6TyTPh702UMXqeHag2ZUG0YPch6-XWd2o4S_dK1J4&usqp=CAU'

    // Elimina el event listener default para la subida de archivos
    const srcClone = this.src.cloneNode(true);
    // @ts-ignore
    this.src.parentNode.replaceChild(srcClone, this.src);

    srcClone.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files![0];

      const id = this.getAnnouncementId(this.model);

      if (id !== ''){
        this.loading = true;

        this.database.uploadFile(file, 'announcements/' + id).then(url => {
          this.target.src = url;
          this.model.url = url;
          this.loading = false;
        });
      }
      else {
        alert('Por favor, rellena los otros campos antes de subir la imagen');
      }

    })
  }

  ngOnInit(): void { }

  async onSubmit(value: any) {

    value.id = this.getAnnouncementId(value);

    const announcement: Announcement = {
      id: value.id,
      title: value.title,
      subject: value.subject,
      startDate: Timestamp.fromDate(new Date(Number(value.year), Number(value.month) - 1, Number(value.day), Number(value.hour), Number(value.minute))),
      endDate: Timestamp.fromDate(new Date(Number(value.year), Number(value.month) - 1, Number(value.day), 23, 59)),
      author: JSON.parse(localStorage.getItem('user') ?? '{name: null}')
    };

    if (this.model.url) {
      announcement.url = this.model.url;
    }

    await this.database.createAnnouncement(announcement);
    this.open = false;
  }

  getAnnouncementId(announcement: any){

    if (announcement.title != '' && announcement.subject != '' && announcement.year && announcement.month && announcement.day && announcement.minute && announcement.hour ){
      return announcement.year + '-' + announcement.month + '-' + announcement.day + '-' + announcement.hour + '-' + announcement.minute + '-' +
      announcement.title.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-');
    }

    else {
      return '';
    }

  }
}

