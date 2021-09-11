import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectService } from 'src/app/services';
import { Project } from './../../../models/project';
// import { ProjectStatus } from './../../../data/enums';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
})
export class ProjectDetailsComponent implements OnInit {
  projectForm: FormGroup;
  rate = 4;
  nextAction = 'Initial';
  biddingCloseDate = '';

  //public project: Project;
  @Input() public project: Project;

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

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    // this.projectForm = this.createFormGroupWithFB();
    console.log(this.project);
    this.getNextAction(this.project.status);
    // if (this.project) {
    //   console.log(this.project);
    //   this.projectForm.patchValue(this.project);
    // }
  }

  getNextAction(currentStatus: string) {
    if (currentStatus == 'Initial') {
      this.nextAction = 'Publish for Bidding';
    } else if (currentStatus == 'Bidding') {
      this.nextAction = 'Close Bidding';
    }
  }

  changeStatus() {
    let nextStatus = '';
    if (this.nextAction == 'Publish for Bidding') {
      nextStatus = 'Bidding';
    }
    this.projectService
      .changeStatus(
        this.project.id,
        nextStatus,
        new Date(this.biddingCloseDate)
      )
      .subscribe((res) => {
        console.log(res);
        this.modalRef.hide();
      });
  }

  edit() {
    this.event.emit(this.project);
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
