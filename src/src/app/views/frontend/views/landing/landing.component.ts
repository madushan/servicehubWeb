import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FindTalentComponent } from "./../findTalent/find-talent.component";
//import { FindWorkComponent } from "./../findWork/find-work.component";

@Component({
  selector: "app-landing",
  styleUrls:["./landing.component.css"],
  templateUrl: "./landing.component.html",
})
export class LandingComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}
  config = {
    initialState: {
      agreement: null,
    },
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
    //class: 'modal-right'
  };

  ngOnInit(): void {}

  navigateToFindTalent(){
    this.config.initialState.agreement = null;
    this.bsModalRef = this.modalService.show(
      FindTalentComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      //console.log(res);
      // this.agreementService.add(res.data).subscribe((d) => {
      //   console.log(d);
      //   //this.data.push(res.data)
      // });
    });
  }

  navigateToFindWork(){
    this.config.initialState.agreement = null;
    this.bsModalRef = this.modalService.show(
      //FindWorkComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      //console.log(res);
      // this.agreementService.add(res.data).subscribe((d) => {
      //   console.log(d);
      //   //this.data.push(res.data)
      // });
    });
  }
}

