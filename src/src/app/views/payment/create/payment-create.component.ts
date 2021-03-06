import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Payment } from '../../../models/payment';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
})
export class PaymentCreateComponent implements OnInit {
  paymentForm: FormGroup;

  //public project: Project;
  @Input() public payment: Payment;

  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;
  //   config = {
  //     backdrop: true,
  //     ignoreBackdropClick: true,
  //     class: 'modal-lg',
  //     //class: 'modal-right'
  //   };
  //   categories = [
  //     { label: 'Cakes', value: 'chocolate' },
  //     { label: 'Cupcakes', value: 'vanilla' },
  //     { label: 'Desserts', value: 'strawberry' },
  //   ];

  // this.modalRef = this.modalService.show(
  //   template,
  //   Object.assign({}, { class: 'modal-sm' })
  // );

  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.paymentForm = this.createFormGroupWithFB();
    console.log('on init');
    if (this.payment) {
      console.log(this.payment);
      this.paymentForm.patchValue(this.payment);
    }
  }

  //   createFormGroup() {
  //     return new FormGroup({
  //       title: new FormControl(),
  //       category: new FormControl(),
  //       description: new FormControl(),
  //     });
  //   }

  createFormGroupWithFB() {
    return (this.paymentForm = this.fb.group({
      id: '0',
      value: '',
    }));
  }

  saveToList(form) {
    console.log(form);
    if (form.value) {
      this.triggerEvent(form.value);
      this.modalRef.hide();
    }
  }

  triggerEvent(item: any) {
    this.event.emit({ data: item, res: 200 });
  }

  //   show() {
  //     this.modalRef = this.modalService.show(this.template, this.config);
  //     return this.modalRef;
  //   }

  //   onSubmit() {
  //     console.log('submit');
  //   }
}
