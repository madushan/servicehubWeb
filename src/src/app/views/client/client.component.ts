import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Client } from './../../models/client';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ClientService } from './../../services/client.service';
import { ClientCreateComponent } from './create/client-create.component';
import { ClientDetailsComponent } from './details/client-details.component';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  //constructor(private renderer: Renderer2) {}

  displayMode = 'list';
  selectAllState = '';
  selected: Client[] = [];
  data: Client[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;

  bsModalRef: BsModalRef;

  config = {
    initialState: {
      client: null,
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
  };

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  //@ViewChild('addNewModalRef', { static: true })  addNewModalRef: ProjectCreateComponent; //AddNewProductModalComponent;

  constructor(
    private hotkeysService: HotkeysService,
    //private apiService: ApiService,
    private clientService: ClientService,
    private modalService: BsModalService
  ) {
    this.hotkeysService.add(
      new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
        this.selected = [...this.data];
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
  //   ngOnDestroy(): void {
  //     throw new Error('Method not implemented.');
  //   }

  ngOnInit(): void {
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy
    );
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
    this.clientService
      .getPageResult(pageSize, currentPage, search, orderBy)
      .subscribe(
        (result) => {
          console.log(result);
          if (result.state) {
            this.isLoading = false;
            this.data = result.data;
            // .pipe(
            // map(x => {
            //   console.log(x);
            //   return {
            //     x
            //     //img: x.img.replace('/img/', '/img/products/')
            //   };
            // }
            // ));
            this.totalItem = result.totalItem;
            this.totalPage = result.totalPage;
            this.setSelectAllState();
          } else {
            this.endOfTheList = true;
          }
          console.log(this.data);
        },
        (error) => {
          this.isLoading = false;
        }
      );
    // this.projectService.getProjects().subscribe(pagingData => {

    // })
  }

  addEntity() {
    this.config.initialState.client = null;
    this.bsModalRef = this.modalService.show(
      ClientCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      //console.log(res);
      this.clientService.add(res.data).subscribe((d) => {
        console.log(d);
        //this.data.push(res.data)
      });
    });
  }

  viewEntity(client: Client) {
    console.log(client);
    this.config.initialState.client = client;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(
      ClientDetailsComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;

    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.editEntity(res);
      //   this.projectService.add(res.data).subscribe((d) => {
      //     console.log(d);
      //     //this.data.push(res.data)
      //   });
    });
  }

  editEntity(client: Client) {
    this.config.initialState.client = client;
    this.bsModalRef = this.modalService.show(
      ClientCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = project; //new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.clientService.update(res.data).subscribe(() => {
        //this.data.(res.data);
      });
    });
  }
  deleteEntity(client: Client) {
    this.configDelete.initialState.title = 'Are you want to delete?';
    this.bsModalRef = this.modalService.show(
      ModalConfirmComponent,
      this.configDelete
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      if (res.isConfirmed == true) {
        this.clientService
          .delete(+client.id)
          .subscribe(() => this.data.filter((x) => x.id == client.id));
      }
    });
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  //   showAddNewModal(): void {
  //     this.bsModalRef =  this.addNewModalRef.show();
  //   }

  isSelected(p: Client): boolean {
    return this.selected.findIndex((x) => x.id === p.id) > -1;
  }
  onSelect(item: Client): void {
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

  onContextMenuClick(action: string, item: Client): void {
    console.log(
      'onContextMenuClick -> action :  ',
      action,
      ', item.title :',
      item.firstName
    );
  }
}
