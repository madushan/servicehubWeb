import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models';
import { ProjectService, UserService } from 'src/app/services';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, AfterViewInit {

  displayMode = 'list';
  selectAllState = '';
  selected: User[] = [];
  selected$: Observable<User[]> = of([]);
  users: User[] = [];
  users$: Observable<User[]> = of([]);
  currentPage = 1;
  currentPage$ = of(1);
  itemsPerPage = 10;
  itemsPerPage$ = of(10);
  search = '';
  orderBy = '';
  isLoading: boolean;
  isLoading$ = of(false);
  endOfTheList = false;
  endOfTheList$ = of(false);
  totalItem = 0;
  totalItem$ = of(0);
  totalPage = 0;
  totalPage$ = of(0);

  bsModalRef: BsModalRef;

  workStages = [
    { label: 'Proposed', value: 'proposed' },
    { label: 'Current Projects', value: 'current' },
    { label: 'Finished Projects', value: 'finished' }];

  selectedStage = this.workStages[0];

  workStage: string = '';

  config = {
    initialState: {
      project: null,
      projectMode: 'add'
    },
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
    //class: 'modal-right'
  };

  configDelete = {
    initialState: {
      title: '',
    },
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md',
    //class: 'modal-right'
  };

  notificationConfig = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: true,
  };

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  //@ViewChild('addNewModalRef', { static: true })  addNewModalRef: ProjectCreateComponent; //AddNewProductModalComponent;

  constructor(
    private hotkeysService: HotkeysService,
    private notifications: NotificationsService,
    private translate: TranslateService,
    //private apiService: ApiService,
    private userService: UserService,
    private modalService: BsModalService
  ) {
    this.hotkeysService.add(
      new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
        this.selected$ = this.users$; // [...this.data];
        return false;
      })
    );
    this.hotkeysService.add(
      new Hotkey('ctrl+d', (event: KeyboardEvent): boolean => {
        this.selected = [];
        return false;
      })
    );
  }

  ngOnInit(): void {
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy,
      this.workStage
    );
  }

  ngAfterViewInit(): void {
    // this.notifications.success(
    //   'alert.success-alert', // title
    //   'alert.success-alert-text', // content
    //   this.notificationConfig
    // );
  }

  loadData(
    pageSize: number = 10,
    currentPage: number = 1,
    search: string = '',
    orderBy: string = '',
    filterBy: string

  ) {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;
    console.log('loading data');
    // this.apiService.getProducts(pageSize, currentPage, search, orderBy).subscribe(
    this.users$ = this.userService
      .getPageResult(pageSize, currentPage, search, orderBy, filterBy,'')
      .pipe(
        tap((d) => {
          console.log(d);
          this.users = d.data;
          this.totalItem = d.totalItem;
          this.totalPage = d.totalPage;
          console.log(this.users);
        }),
        map((result) => {
          console.log(result);
          if (result.state) {
            this.users = result.data;
            return result.data;
          }
        })
      );
    this.users$.subscribe(c => console.log(c));
    // this.projectService.getProjects().subscribe(pagingData => {

    // })
  }

  addEntity() {
    this.config.initialState.project = new User();
    this.config.initialState.projectMode = 'add';

    this.bsModalRef = this.modalService.show(
      UserCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      //console.log(res);
      this.userService.add(res.data).subscribe((d) => {
        console.log(d);

        //this.data.push(res.data)

        this.notifications.success(
          'Create product', // title
          res.data.title + ' added successfully', // content
          this.notificationConfig
        );
      });
    });
  }

  viewEntity(user: User) {
    console.log(user);
    this.config.initialState.project = user;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(
      UserDetailsComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;

    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.editEntity(res);
    });
  }

  editEntity(user: User) {
    console.log(user);
    this.config.initialState.project = user;
    this.config.initialState.projectMode = 'edit';
    this.bsModalRef = this.modalService.show(
      UserCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = project; //new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.userService.update(res.data).subscribe(() => {
        //this.data.(res.data);
        this.notifications.info(
          'Edit product', // title
          user.name + ' edited successfully', // content
          this.notificationConfig
        );
      });
    });
  }
  deleteEntity(user: User) {
    this.configDelete.initialState.title =
      'Are you want to delete ' + user.name + '?';
    this.bsModalRef = this.modalService.show(
      ModalConfirmComponent,
      this.configDelete
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      if (res.isConfirmed == true) {
        this.userService.delete(+user.id).subscribe(() => {
          this.users.filter((x) => x.id == user.id);

          this.notifications.warn(
            'Delete product', // title
            user.name + ' deleted successfully', // content
            this.notificationConfig
          );
        });
      }
    });
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  //   showAddNewModal(): void {
  //     this.bsModalRef =  this.addNewModalRef.show();
  //   }

  isSelected(p: User): boolean {
    return this.selected.findIndex((x) => x.id === p.id) > -1;
  }
  onSelect(item: User): void {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter((x) => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState(): void {
    if (this.selected.length === this.users.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.users];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy, this.workStage);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy, this.workStage);
  }

  changeOrderBy(item: any): void {
    //this.loadData(this.itemsPerPage, 1, this.search, item.value);
    this.workStage = item;
    this.loadData(this.itemsPerPage, 1, this.search, item.value, this.workStage);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy, this.workStage);
  }

  onContextMenuClick(action: string, item: User): void {
    console.log(
      'onContextMenuClick -> action :  ',
      action,
      ', item.name :',
      item.name
    );
  }

  // constructor(private renderer: Renderer2) { }

  // ngOnInit(): void {
  //   this.renderer.addClass(document.body, 'background');
  //   this.renderer.addClass(document.body, 'no-footer');
  // }

  // ngOnDestroy(): void {
  //   this.renderer.removeClass(document.body, 'background');
  //   this.renderer.removeClass(document.body, 'no-footer');
  // }
}
