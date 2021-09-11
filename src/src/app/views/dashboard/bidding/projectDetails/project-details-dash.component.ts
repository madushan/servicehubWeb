import {
  AfterViewChecked,
  AfterViewInit,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Bid } from 'src/app/models';
import { BidService } from 'src/app/services';
import { Project } from '../../../../models/project';
// import { ProjectStatus } from './../../../data/enums';

@Component({
  selector: 'app-project-dash-details',
  templateUrl: './project-details-dash.component.html',
})
export class ProjectDetailsDashComponent implements OnInit, AfterViewChecked {
  bidForm: FormGroup;
  rate = 4;

  showBids: boolean = false;
  bid: Bid;

  //public project: Project;
  @Input() public project: Project;

  bids$: Observable<Bid[]>;

  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;
  //   config = {
  //     backdrop: true,
  //     ignoreBackdropClick: true,
  //     class: 'modal-lg',
  //     //class: 'modal-right'
  //   };
  //   categories = [
  //     { label: 'Cakes', value: 'chocolate' },
  //     { label: 'Cupcakes', value: 'vanilla' },
  //     { label: 'Desserts', value: 'strawberry' },
  //   ];

  // this.modalRef = this.modalService.show(
  //   template,
  //   Object.assign({}, { class: 'modal-sm' })
  // );

  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private notifications: NotificationsService,
    private bidService: BidService
  ) {
    this.bid = new Bid();
  }
  ngAfterViewChecked(): void {
    // console.log('after view checked');
    // if (this.showBids) {
    //   console.log(this.showBids);
    //   let el = document.getElementById('bid-section');
    //   el.scrollIntoView();
    // }
  }
  // ngAfterViewInit(): void {

  // }

  ngOnInit() {
    this.bidForm = this.createFormGroupWithFB();
    //this.bids$ = this.bidService.getBidsByProject(this.project.id);
    this.bidService.getBidByProjectAndUser(this.project.id).subscribe((b) => {
      console.log(b);
      this.bid = { ...b };
      console.log(this.bid);
      this.bidForm.patchValue(this.bid);
    });
    console.log(this.project);
    // if (this.project) {
    //   console.log(this.project);
    //   this.bidForm.patchValue(this.project);
    // }
  }

  saveBid() {
    console.log(this.bid);
    console.log(this.bidForm.value);
    this.bid.id = 0;
    this.bid.description = this.bidForm.value.description;
    this.bid.amount = this.bidForm.value.amount;
    this.bid.requiredTime = this.bidForm.value.requiredTime;
    this.bid.projectId = this.project.id;
    this.bid.providerId = 3;
    this.bidService.add(this.bid).subscribe(
      (res) => {
        console.log(res);

        this.notifications.create(
          'Successfull',
          'Your bid saved successfully',
          NotificationType.Success,
          {
            theClass: 'outline primary',
            timeOut: 6000,
            showProgressBar: true,
          }
        );

        //this.modalRef.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  edit() {
    this.event.emit(this.project);
    this.modalRef.hide();
  }

  scroll() {
    // console.log(`scrolling to`);
    // if (this.showBids) {
    //   let el = document.getElementById('bid-section');
    //   el.scrollIntoView();
    // }
  }

  showBidding() {
    this.showBids = !this.showBids;

    //this.scroll();
  }

  //   createFormGroup() {
  //     return new FormGroup({
  //       title: new FormControl(),
  //       category: new FormControl(),
  //       description: new FormControl(),
  //     });
  //   }

  createFormGroupWithFB() {
    return (this.bidForm = this.fb.group({
      description: '',
      amount: 0,
      requiredTime: 0,
    }));
  }

  //   saveToList(form) {
  //     console.log(form);
  //     if (form.value) {
  //       this.triggerEvent(form.value);
  //       this.modalRef.hide();
  //     }
  //   }

  //   triggerEvent(item: any) {
  //     this.event.emit({ data: item, res: 200 });
  //   }

  //   show() {
  //     this.modalRef = this.modalService.show(this.template, this.config);
  //     return this.modalRef;
  //   }

  //   onSubmit() {
  //     console.log('submit');
  //   }
}
