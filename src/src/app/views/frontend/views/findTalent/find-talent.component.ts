import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { Project } from "src/app/models";

@Component({
  templateUrl:"./find-talent.component.html"
})

export class FindTalentComponent implements OnInit{

  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;

  talentFormGroup:FormGroup;

  project$:Observable<Project>;

  constructor(private fb:FormBuilder) {
    console.log("talent");
  }

  ngOnInit(){
    this.talentFormGroup = this.fb.group({
      title:'',
      description:'',
      skills:'',
      expertiseLevel:'',
      paymentType:''
    })
  }

  saveToList(){}
}

//     title:string;
//     description:string;
//     estimatedTimeEffort:number;
//     requiredSkills:Skill[];
//     requiredExpertiseLevel:string;
//     estimatedBudget:number;
//     category:string;
//     consumerId:number;
//     consumer:Consumer;
