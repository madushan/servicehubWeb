import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Provider,Consumer,Agreement, Project} from './../../../models';
import { ConsumerService,ProjectService,ProviderService } from './../../../services';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-agreement-create',
  templateUrl: './agreement-create.component.html',
})
export class AgreementCreateComponent implements OnInit {
  agreementForm: FormGroup;

  providers$:Observable<Provider[]>;
  consumers$:Observable<Consumer[]>;
  projects$:Observable<Project[]>;

  //public project: Project;
  @Input() public agreement: Agreement;

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

  constructor(private modalService: BsModalService,
     private fb: FormBuilder,
     private consumerService:ConsumerService,
     private providerService:ProviderService,
     private projectService:ProjectService) {}

  ngOnInit() {
    this.consumers$ = this.consumerService.getAll()
    .pipe(
      tap((x) => console.log(x)),
      map(result => {
            return  Object.values(result)[1] as any;
          })
      );
    this.providers$ = this.providerService.getAll().pipe(tap((x) => console.log(x)));
    this.projects$ = this.projectService.getAll().pipe(tap((x) => console.log(x)));
    this.agreementForm = this.createFormGroupWithFB();
    console.log('on init');
    if (this.agreement) {
      console.log(this.agreement);
      this.agreementForm.patchValue(this.agreement);
    }
    this.consumers$.subscribe((x) => console.log(x));
  }

  //   createFormGroup() {
  //     return new FormGroup({
  //       title: new FormControl(),
  //       category: new FormControl(),
  //       description: new FormControl(),
  //     });
  //   }

  createFormGroupWithFB() {
    return (this.agreementForm = this.fb.group({
      id: '0',
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
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
