import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  public modalRef: BsModalRef;

  constructor(private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName:'',
      password:'',
      rememberMe:false
    });
  }
  login(){
    console.log(this.loginForm.value);
    const sessionToken = sessionStorage.setItem("user",this.loginForm.value.userName);
    if (this.loginForm.value.userName) {
      this.triggerEvent(true);
      this.modalRef.hide();
    }
  }
  triggerEvent(item: any) {
    this.event.emit({ data: item, res: 200 });
  }

}
