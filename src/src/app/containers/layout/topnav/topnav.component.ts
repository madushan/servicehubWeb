import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LangService, Language } from 'src/app/shared/lang.service';
import { environment } from 'src/environments/environment';
import { getThemeColor, setThemeColor } from 'src/app/utils/util';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChatComponent } from 'src/app/views/app/applications/chat/chat.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDetailsComponent } from 'src/app/views/user/details/user-details.component';
import { User } from 'src/app/models';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
})
export class TopnavComponent implements OnInit, OnDestroy {
  buyUrl = environment.buyUrl;
  adminRoot = environment.adminRoot;
  homeUrl = environment.homeUrl;
  sidebar: ISidebar;
  subscription: Subscription;
  displayName = '';
  languages: Language[];
  currentLanguage: string;
  isSingleLang;
  isFullScreen = false;
  isDarkModeActive = false;
  searchKey = '';

  currentUser = null;
  userId = '';

  bsModalRef: BsModalRef;
  config = {
    initialState: {
      project: null,
    },
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-right modal-xl',
    //class: 'modal-right'
  };

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router,
    private langService: LangService,
    private modalService: BsModalService
  ) {
    this.languages = this.langService.supportedLanguages;
    this.currentLanguage = this.langService.languageShorthand;
    this.isSingleLang = this.langService.isSingleLang;
    this.isDarkModeActive = getThemeColor().indexOf('dark') > -1 ? true : false;
    this.currentUser = this.authService.getCurretUser();
    //console.log(this.currentUser);
    this.displayName = this.currentUser?.Name;
    this.userId = this.currentUser?.Id;
  }

  showChatWindow() {
    //console.log('chat window open');
    this.bsModalRef = this.modalService.show(ChatComponent, this.config);
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    // this.bsModalRef.content.event.subscribe((res) => {
    //   console.log(res);
    //   //   this.projectService.add(res.data).subscribe((d) => {
    //   //     console.log(d);
    //   //     //this.data.push(res.data)
    //   //   });
    // });
  }

  onDarkModeChange(event): void {
    let color = getThemeColor();
    if (color.indexOf('dark') > -1) {
      color = color.replace('dark', 'light');
    } else if (color.indexOf('light') > -1) {
      color = color.replace('light', 'dark');
    }
    setThemeColor(color);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  fullScreenClick(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreen(event): void {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }

  onLanguageChange(lang): void {
    this.langService.language = lang.code;
    this.currentLanguage = this.langService.languageShorthand;
  }

  async ngOnInit(): Promise<void> {
    // if (await this.authService.getUser()) {
    //   this.displayName = await this.authService.getUser().then((user) => {
    //     return user.displayName;
    //   });
    // }
    // this.subscription = this.sidebarService.getSidebar().subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.sidebar = res;
    //   },
    //   (err) => {
    //     console.error(`An error occurred: ${err.message}`);
    //   }
    // );
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  menuButtonClick = (
    e: { stopPropagation: () => void },
    menuClickCount: number,
    containerClassnames: string
  ) => {
    if (e) {
      e.stopPropagation();
    }

    // console.log(menuClickCount);
    // console.log(containerClassnames);

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);

    this.sidebarService.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.sidebar.selectedMenuHasSubItems
    );
  };

  mobileMenuButtonClick = (
    event: { stopPropagation: () => void },
    containerClassnames: string
  ) => {
    if (event) {
      event.stopPropagation();
    }
    this.sidebarService.clickOnMobileMenu(containerClassnames);
  };

  onSignOut(): void {
    this.authService.logout().subscribe((res) => {
      console.log(res);
      this.router.navigate(['/']);
    });
  }

  profileView() {
    console.log(this.currentUser);
    this.config.initialState.project = this.currentUser;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(UserDetailsComponent, this.config);
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      //this.editEntity(res);
    });
  }

  // editEntity(user: User) {
  //   console.log(user);
  //   this.config.initialState.project = user;
  //   this.config.initialState.projectMode = 'edit';
  //   this.bsModalRef = this.modalService.show(
  //     UserCreateComponent,
  //     this.config
  //   );
  //   //this.bsModalRef.content.project = project; //new Project();
  //   this.bsModalRef.content.modalRef = this.bsModalRef;
  //   this.bsModalRef.content.event.subscribe((res) => {
  //     console.log(res);
  //     this.userService.update(res.data).subscribe(() => {
  //       //this.data.(res.data);
  //       this.notifications.info(
  //         'Edit product', // title
  //         user.name + ' edited successfully', // content
  //         this.notificationConfig
  //       );
  //     });
  //   });
  // }

  searchKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    } else if (event.key === 'Escape') {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) {
        input.classList.remove('mobile-view');
      }
      this.searchKey = '';
    }
  }

  searchAreaClick(event): void {
    event.stopPropagation();
  }
  searchClick(event): void {
    if (window.innerWidth < environment.menuHiddenBreakpoint) {
      let elem = event.target;
      if (!event.target.classList.contains('search')) {
        if (event.target.parentElement.classList.contains('search')) {
          elem = event.target.parentElement;
        } else if (
          event.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = event.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
      } else {
        elem.classList.add('mobile-view');
      }
    } else {
      this.search();
    }
    event.stopPropagation();
  }

  search(): void {
    if (this.searchKey && this.searchKey.length > 1) {
      this.router.navigate([this.adminRoot + '/pages/miscellaneous/search'], {
        queryParams: { key: this.searchKey.toLowerCase().trim() },
      });
      this.searchKey = '';
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event): void {
    const input = document.querySelector('.mobile-view');
    if (input && input.classList) {
      input.classList.remove('mobile-view');
    }
    this.searchKey = '';
  }
}
