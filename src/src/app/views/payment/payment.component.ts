import { Component, OnInit, ViewChild } from '@angular/core';
// import { AddNewProductModalComponent } from 'src/app/containers/pages/add-new-product-modal/add-new-product-modal.component';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
// import { ApiService } from 'src/app/data/api.service';
// import { IProduct } from 'src/app/data/api.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { PaymentService } from '../../services/payment.service';
// import { Advertisement } from '../../models/advertisement';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Payment } from '../../models/payment';
import { PaymentCreateComponent } from './create/payment-create.component';
import { PaymentDetailsComponent } from './details/payment-details.component';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
// import { ListPageHeaderComponent } from 'src/app/containers/pages/list-page-header/list-page-header.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  displayMode = 'list';
  selectAllState = '';
  selected: Payment[] = [];
  data: Payment[] = [];
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
      payment: null,
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
    private paymentService: PaymentService,
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
    this.paymentService
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
    this.config.initialState.payment = null;
    this.bsModalRef = this.modalService.show(
      PaymentCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      //console.log(res);
      this.paymentService.add(res.data).subscribe((d) => {
        console.log(d);
        //this.data.push(res.data)
      });
    });
  }

  viewEntity(payment: Payment) {
    console.log(payment);
    this.config.initialState.payment = payment;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(
      PaymentDetailsComponent,
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

  editEntity(payment: Payment) {
    this.config.initialState.payment = payment;
    this.bsModalRef = this.modalService.show(
      PaymentCreateComponent,
      this.config
    );
    //this.bsModalRef.content.project = project; //new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      this.paymentService.update(res.data).subscribe(() => {
        //this.data.(res.data);
      });
    });
  }
  deleteEntity(payment: Payment) {
    this.configDelete.initialState.title = 'Are you want to delete?';
    this.bsModalRef = this.modalService.show(
      ModalConfirmComponent,
      this.configDelete
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      if (res.isConfirmed == true) {
        this.paymentService
          .delete(+payment.id)
          .subscribe(() => this.data.filter((x) => x.id == payment.id));
      }
    });
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  //   showAddNewModal(): void {
  //     this.bsModalRef =  this.addNewModalRef.show();
  //   }

  isSelected(p: Payment): boolean {
    return this.selected.findIndex((x) => x.id === p.id) > -1;
  }
  onSelect(item: Payment): void {
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

  onContextMenuClick(action: string, item: Payment): void {
    console.log(
      'onContextMenuClick -> action :  ',
      action,
      ', item.title :',
      item.value
    );
  }
}
