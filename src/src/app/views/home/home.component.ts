import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Subscription } from 'rxjs';
import { ISidebar, SidebarService } from 'src/app/containers/layout/sidebar/sidebar.service';
import { UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  constructor(private sidebarService: SidebarService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  // consumer: 3, provider: 4, admin: 2
  setUser() {
    this.userService.get(3).subscribe(user => {
      localStorage.setItem('currentUserId', user.id.toString());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
