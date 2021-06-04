import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddNewProductModalComponent } from 'src/app/containers/pages/add-new-product-modal/add-new-product-modal.component';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ApiService } from 'src/app/data/api.service';
// import { IProduct } from 'src/app/data/api.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ProjectCreateComponent } from './create/project-create.component';
import { ProjectDetailsComponent } from './details/project-details.component';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { map, tap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TranslateService } from '@ngx-translate/core';
import { ModalConfirmComponent } from './../components/modal-confirm/modal-confirm.component';
import { Observable, of } from 'rxjs';
// import { ListPageHeaderComponent } from 'src/app/containers/pages/list-page-header/list-page-header.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit, AfterViewInit {
  displayMode = 'list';
  selectAllState = '';
  selected: Project[] = [];
  selected$: Observable<Project[]> = of([]);
  data: Project[] = [];
  projects$: Observable<Project[]> = of([]);
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

  config = {
    initialState: {
      project: null,
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
    private projectService: ProjectService,
    private modalService: BsModalService
  ) {
    this.hotkeysService.add(
      new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
        this.selected$ = this.projects$; // [...this.data];
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
      this.orderBy
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
    orderBy: string = ''
  ): void {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    // this.apiService.getProducts(pageSize, currentPage, search, orderBy).subscribe(
    this.projects$ = this.projectService
      .getPageResult(pageSize, currentPage, search, orderBy)
      .pipe(
        tap((d) => {
          this.totalItem = d.totalItem;
          this.totalPage = d.totalPage;
        }),
        map((result) => {
          if (result.state) {
            return result.data;
            //     this.isLoading = false;
            //     this.data = result.data;
            //     // .pipe(
            //     // map(x => {
            //     //   console.log(x);
            //     //   return {
            //     //     x
            //     //     //img: x.img.replace('/img/', '/img/products/')
            //     //   };
            //     // }
            //     // ));
            //     this.totalItem = result.totalItem;
            //     this.totalPage = result.totalPage;
            //     this.setSelectAllState();
            //   } else {
            //     this.endOfTheList = true;
            //   }
            //   console.log(this.data);
          }
          // (error) => {
          //   this.isLoading = false;
        })
      );
    // this.projectService.getProjects().subscribe(pagingData => {

    // })
  }

  addEntity() {
    this.config.initialState.project = null;
    this.bsModalRef = this.modalService.show(
      ProjectCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      //console.log(res);
      this.projectService.add(res.data).subscribe((d) => {
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

  viewEntity(project: Project) {
    console.log(project);
    this.config.initialState.project = project;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(
      ProjectDetailsComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;

    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.editEntity(res);
    });
  }

  editEntity(project: Project) {
    this.config.initialState.project = project;
    this.bsModalRef = this.modalService.show(
      ProjectCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = project; //new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.projectService.update(res.data).subscribe(() => {
        //this.data.(res.data);
        this.notifications.info(
          'Edit product', // title
          project.title + ' edited successfully', // content
          this.notificationConfig
        );
      });
    });
  }
  deleteEntity(project: Project) {
    this.configDelete.initialState.title =
      'Are you want to delete ' + project.title + '?';
    this.bsModalRef = this.modalService.show(
      ModalConfirmComponent,
      this.configDelete
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      if (res.isConfirmed == true) {
        this.projectService.delete(+project.id).subscribe(() => {
          this.data.filter((x) => x.id == project.id);

          this.notifications.warn(
            'Delete product', // title
            project.title + ' deleted successfully', // content
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

  isSelected(p: Project): boolean {
    return this.selected.findIndex((x) => x.id === p.id) > -1;
  }
  onSelect(item: Project): void {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter((x) => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState(): void {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }

  onContextMenuClick(action: string, item: Project): void {
    console.log(
      'onContextMenuClick -> action :  ',
      action,
      ', item.title :',
      item.title
    );
  }
}
