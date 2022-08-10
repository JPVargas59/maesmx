import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = "Titulo Modal";
  @Input() body: string = "Body Modal";
  @Input() open: boolean = false;
  @Input() canClose: boolean = true;
  @Output() onClose = new EventEmitter<void>();
  @Input() closeBtnText: string = "Cancelar";

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.onClose.emit();
  }

}
