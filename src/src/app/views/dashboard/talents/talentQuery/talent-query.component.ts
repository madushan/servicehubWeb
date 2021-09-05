import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-talent-query',
  templateUrl: 'talent-query.component.html'
})

export class TalentQueryComponent implements OnInit {
  filterTime: FormControl = new FormControl('cupcake');
  expertLevel: FormControl = new FormControl('basic');

  form: FormGroup;

  constructor(
    private formGroup: FormBuilder
  ) { }

  ngOnInit() {
    this.getQueryForm();
  }

  getQueryForm() {
    this.form = this.formGroup.group({
      filterTime: '7days',
      expertLevel: 'basic'
    })
  }
}
