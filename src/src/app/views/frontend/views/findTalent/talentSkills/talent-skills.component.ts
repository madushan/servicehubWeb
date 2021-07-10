import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  template:`<h2>Talent skills</h2>
    <skills></skills>
    <app-expertise-level></app-expertise-level>
  `
})

export class TalentSkillsComponent{
  constructor(private fb:FormBuilder){}

  form = this.fb.group({
    talentTitle: this.fb.group({
      title: '',
      description: ''
    }),
    talentSkills:this.fb.group({

    })
  });
}
