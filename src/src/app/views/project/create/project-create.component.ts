import { EventEmitter, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
})
export class ProjectCreateComponent implements OnInit {
 projectForm: FormGroup;

 project:Project;
 
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
    private fb:FormBuilder) {
        console.log('constructor');
      
  }

  ngOnInit(){
    this.projectForm = this.createFormGroupWithFB();
    console.log("on init");
  }

  createFormGroup(){
    return new FormGroup({
        title:new FormControl(),
        category:new FormControl(),
        description:new FormControl()
    })
  }

  createFormGroupWithFB(){
    return this.projectForm = this.fb.group({
        //id:'',
        title:'',
        category:'',
        description:''
    });
  }

  saveToList(form) {
      console.log(form);
    if(form.value){
      this.triggerEvent(form.value);
      this.modalRef.hide();
    }
    
  }

  triggerEvent(item: any) {
    this.event.emit({ data: item , res:200  });
  }

//   show() {
//     this.modalRef = this.modalService.show(this.template, this.config);
//     return this.modalRef;
//   }

//   onSubmit() {
//     console.log('submit');
//   }
}
