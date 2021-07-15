import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-bid-query',
  templateUrl: 'bid-query.component.html'
})

export class BidQueryComponent implements OnInit {
  filterTime: FormControl = new FormControl('cupcake');
  expertLevel: FormControl = new FormControl('basic');

  constructor() { }

  ngOnInit() { }
}
