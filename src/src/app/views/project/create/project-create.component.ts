import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Skill } from 'src/app/models';
import { Project } from 'src/app/models/project';
import { AuthService, ProjectService, SkillService } from 'src/app/services';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
})
export class ProjectCreateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;
  @Input() public project: Project;
  @Input() public projectMode: string;

  projectFormGroup: FormGroup;
  currentUser = null;

  skills$:Observable<Skill[]>;
  project$: Observable<Project>;

  constructor(private fb: FormBuilder,
     private authService: AuthService,
     private skillService:SkillService,
    private notifications: NotificationsService,
    private projectService: ProjectService) {
    this.currentUser = this.authService.getCurretUser();
  }

  ngOnInit() {
    this.projectFormGroup = this.createFormGroup();
    this.skills$ = this.skillService.getAll().pipe(tap(console.log),map(s => s[1]));

    if (this.project) {
      this.projectFormGroup.patchValue(this.project);
    }
  }

  createFormGroup() {
    return this.fb.group({
      title: '',
      description: '',
      estimatedTimeEffort:'',
      requiredSkills: '',
      requiredExpertiseLevel: '',
      estimatedBudget: '',
      category:''
    });
  }

  saveProject() {

    this.project.title = this.projectFormGroup.value.title;
    this.project.description = this.projectFormGroup.value.description;
    this.project.estimatedTimeEffort = this.projectFormGroup.value.estimatedTimeEffort;
    this.project.requiredSkills = this.projectFormGroup.value.requiredSkills;
    this.project.requiredExpertiseLevel = this.projectFormGroup.value.requiredExpertiseLevel;
    this.project.estimatedBudget = this.projectFormGroup.value.estimatedBudget;
    this.project.category = this.projectFormGroup.value.category;
    this.project.consumerId = 1;
    this.project.isActive = true;

    console.log(this.project);

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
      console.log('put project');
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
