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
import { ProjectStages } from './../../data/enums';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit, AfterViewInit {
  displayMode = 'list';
  selectAllState = '';
  selected: Project[] = [];
  selected$: Observable<Project[]> = of([]);
  projects: Project[] = [];
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

  projectStages = [
    { label: 'New', value: ProjectStages.new },
    { label: 'Current Projects', value: ProjectStages.working },
    { label: 'Finished Projects', value: ProjectStages.finished }];

  projectStage: string = this.projectStages[0].value;
  selectedStage = this.projectStages[0];

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
    if (localStorage.getItem('projectstage') !== null) {
      this.projectStage = localStorage.getItem('projectstage');
      this.selectedStage = this.projectStages.find(p => p.value == this.projectStage);
    }
  }

  ngOnInit(): void {
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy,
      this.projectStage
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
  ): void {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;
    console.log('loading data');
    // this.apiService.getProducts(pageSize, currentPage, search, orderBy).subscribe(
    this.projects$ = this.projectService
      .getPageResult(pageSize, currentPage, search, orderBy, filterBy)
      .pipe(
        tap((d) => {
          console.log(d);
          this.projects = d.data;
          this.totalItem = d.totalItem;
          this.totalPage = d.totalPage;
          console.log(this.projects);
        }),
        map((result) => {
          if (result.state) {
            this.projects = Object.values(result.data)[1] as any;//result.data;
            return Object.values(result.data)[1] as any;
          }
        })
      );
    this.projects$.subscribe();
    // this.projectService.getProjects().subscribe(pagingData => {

    // })
  }

  addEntity() {
    this.config.initialState.project = new Project();
    this.config.initialState.projectMode = 'add';

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
    console.log(project);
    this.config.initialState.project = project;
    this.config.initialState.projectMode = 'edit';
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
          this.projects.filter((x) => x.id == project.id);

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
    if (this.selected.length === this.projects.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.projects];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy, this.projectStage);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy, this.projectStage);
  }

  changeOrderBy(item: any): void {
    this.projectStage = item.value;
    localStorage.setItem('projectstage', this.projectStage);
    this.loadData(this.itemsPerPage, 1, this.search, item.value, this.projectStage);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy, this.projectStage);
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
