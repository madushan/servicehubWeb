import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Advertisement } from '../../../models/advertisement';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
})
export class AdvertisementDetailsComponent implements OnInit {
  advertisementForm: FormGroup;
  rate = 4;

  //public project: Project;
  @Input() public advertisement: Advertisement;

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
    // this.projectForm = this.createFormGroupWithFB();
    console.log(this.advertisement);
    // if (this.project) {
    //   console.log(this.project);
    //   this.projectForm.patchValue(this.project);
    // }
  }

  edit() {
    this.event.emit(this.advertisement);
    this.modalRef.hide();
  }

  //   createFormGroup() {
  //     return new FormGroup({
  //       title: new FormControl(),
  //       category: new FormControl(),
  //       description: new FormControl(),
  //     });
  //   }

  //   createFormGroupWithFB() {
  //     return (this.projectForm = this.fb.group({
  //       id: '0',
  //       title: '',
  //       category: '',
  //       description: '',
  //     }));
  //   }

  //   saveToList(form) {
  //     console.log(form);
  //     if (form.value) {
  //       this.triggerEvent(form.value);
  //       this.modalRef.hide();
  //     }
  //   }

  //   triggerEvent(item: any) {
  //     this.event.emit({ data: item, res: 200 });
  //   }

  //   show() {
  //     this.modalRef = this.modalService.show(this.template, this.config);
  //     return this.modalRef;
  //   }

  //   onSubmit() {
  //     console.log('submit');
  //   }
}
