import {
  Component,
  EventEmitter,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
})
export class ClientCreateComponent {
  projectForm: FormGroup;

  //public project: Project;
  @Input() public client: Client;

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
    this.projectForm = this.createFormGroupWithFB();
    console.log('on init');
    if (this.client) {
      console.log(this.client);
      this.projectForm.patchValue(this.client);
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
    return (this.projectForm = this.fb.group({
      id: '0',
      firstName: '',
      lastName: '',
      nationalID: '',
      mobileNumber: '',
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
