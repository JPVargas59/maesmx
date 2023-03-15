import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
const Papa = require('papaparse');

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {

  form = new FormGroup({});
  model: any = {
    day: '',
    month: '',
    year: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'day',
      name: 'day',
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
      name: 'month',
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
      name: 'year',
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
    }
  ];

  @Input() isModalActive: boolean | undefined;
  @Input() open = true;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit(): void {
  }



  onSubmit(value: any){
    this.database.getAttendanceReport(value.year, value.month, value.day).subscribe(attendanceList => {
      console.log(attendanceList)
      if (attendanceList.length == 0) {
        alert('Este reporte no existe o está vacío')
      }
      else {
        const csv = Papa.unparse([
          {
            "uid": "",
            "email": "",
            "name": "",
            "career": "",
            "area": "",
            "campus": "",
            "report": "",
            "location": "",
          },
          ...attendanceList
        ]);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const dateString = (new Date(Number(value.year), Number(value.month) - 1, Number(value.day))).toISOString().split('T')[0]

        const a = document.createElement('a');
        a.href = url;
        a.download = `Reporte-Asistencia-MAE-${dateString}.csv`;
        a.click();
      }
    })

    this.open = false;
  }


}
