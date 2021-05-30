import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  SidebarService,
  ISidebar,
} from './../../containers/layout/sidebar/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  //   sidebar: ISidebar;
  //   subscription: Subscription;
  constructor() {
    console.log('Main Component');
  }

  ngOnInit(): void {
    // this.subscription = this.sidebarService.getSidebar().subscribe(
    //   res => {
    //     this.sidebar = res;
    //   },
    //   err => {
    //     console.error(`An error occurred: ${err.message}`);
    //   }
    // );
  }

  //   ngOnDestroy(): void {
  //     // this.subscription.unsubscribe();
  //   }
}
