import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bid-query',
  templateUrl: 'bid-query.component.html'
})

export class BidQueryComponent implements OnInit {
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
