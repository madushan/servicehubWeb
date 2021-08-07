import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Bid } from '../../models/bid';

@Component({
  selector: 'app-bid-list',
  templateUrl: 'bid-list.component.html'
})

export class BidListComponent implements OnInit {
  @Input() bidList: Observable<Bid[]>;
  constructor() { }

  ngOnInit() { }
}
