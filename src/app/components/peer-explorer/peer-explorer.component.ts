import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeerInfo } from '../../models/UserInfo';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DatabaseService } from '../../services/database.service';
import { UtilsService } from '../../services/utils.service';
import { Subject } from '../../models/Subject';

@Component({
  selector: 'app-peer-explorer',
  templateUrl: './peer-explorer.component.html',
  styleUrls: ['./peer-explorer.component.scss'],
})
export class PeerExplorerComponent implements OnInit {
  form = new FormGroup({});
  model: Object | {} = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'subject',
      type: 'select',
      templateOptions: {
        label: 'Materia',
        options: [
          { value: '1', label: 'Matemáticas' },
          { value: '2', label: 'Lenguaje' },
          { value: '3', label: 'Ciencias' },
        ],
        required: true,
      },
    },
    // {
    //   key: 'comment',
    //   type: 'textarea',
    //   templateOptions: {
    //     label: 'Comentario (opcional)',
    //     required: false,
    //   },
    // },
  ];

  subjects: Subject[] = [];
  activePeers: PeerInfo[] = [];
  selectedActivePeers: PeerInfo[] = [];
  selectedSubject: string = '';

  constructor(
    private databaseService: DatabaseService,
    public utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.databaseService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      this.fields[0].templateOptions!.options = subjects.map((subject) => ({
        value: subject.id,
        label: subject.name,
      }));
    });

    this.databaseService
      .getUsersWithActiveSession()
      .subscribe((peers: PeerInfo[]) => {
        this.activePeers = peers;
      });
  }

  isUrl(url: string): boolean {
    // check with regex if url is valid
    const re = new RegExp('https:+');
    return re.test(url);
  }

  onSubmit(value: any) {
    if(!!value.subject){
      this.selectedActivePeers = this.activePeers.filter((peer) =>
        peer.subjects?.some((subject) => subject.id == value.subject)
      );
  
      this.selectedSubject = value.subject;
    }

  }
}
