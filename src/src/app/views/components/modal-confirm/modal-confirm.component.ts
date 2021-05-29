import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;

  @Input() public title: string;

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: BsModalService) {
    console.log('confirm component');
  }
  ngOnInit(): void {
    console.log(this.title);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.triggerEvent(true);
    // this.message = 'Confirmed!';
    // this.modalRef.hide();
  }

  decline(): void {
    this.triggerEvent(false);
    // this.message = 'Declined!';
    // this.modalRef.hide();
  }

  triggerEvent(isConfirmed: boolean) {
    this.event.emit({ isConfirmed });
    this.modalRef.hide();
  }
}
