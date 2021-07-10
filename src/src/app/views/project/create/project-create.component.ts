import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
})
export class ProjectCreateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;

  projectFormGroup:FormGroup;

  project$:Observable<Project>;

  constructor(private fb:FormBuilder,
    private projectService:ProjectService) {
    console.log("talent");
  }

  ngOnInit(){
    this.projectFormGroup = this.fb.group({
      title:'',
      description:'',
      skills:'',
      expertiseLevel:'',
      paymentType:''
    })
  }

  saveToList(){
    this.projectService.add(this.projectFormGroup.value).subscribe();
  }
}
