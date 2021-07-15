import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services';

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
})
export class WorkCreateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;
  @Input() public project: Project;
  @Input() public projectMode: string;

  projectFormGroup: FormGroup;

  project$: Observable<Project>;

  constructor(private fb: FormBuilder,
    private notifications: NotificationsService,
    private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectFormGroup = this.createFormGroup();

    if (this.project) {
      this.projectFormGroup.patchValue(this.project);
    }
  }

  createFormGroup() {
    return this.fb.group({
      title: '',
      description: '',
      requiredSkills: '',
      requiredExpertiseLevel: '',
      estimatedBudget: ''
    });
  }

  saveProject() {

    this.project.title = this.projectFormGroup.value.title;
    this.project.description = this.projectFormGroup.value.description;
    this.project.requiredExpertiseLevel = this.projectFormGroup.value.requiredExpertiseLevel;
    this.project.estimatedBudget = this.projectFormGroup.value.estimatedBudget;

    if (this.projectMode == 'add') {
      this.projectService.add(this.project).subscribe(
        d => {
          console.log(d);
          this.notifications.create('Successfull', this.project.title + ' added successfully', NotificationType.Success,
            { theClass: 'outline primary', timeOut: 6000, showProgressBar: true })
        },
        e => console.log(e)
      );
    } else {
      this.projectService.update(this.project).subscribe(
        d => {
          console.log(d);
          this.notifications.create('Successfull', this.project.title + ' updated successfully', NotificationType.Bare,
            { theClass: 'outline primary', timeOut: 6000, showProgressBar: true })
        },
        e => console.log(e)
      );
    }
    this.modalRef.hide();
  }
}
