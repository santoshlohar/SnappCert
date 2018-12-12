import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-authorized-user',
  templateUrl: './add-authorized-user.component.html',
  styleUrls: ['./add-authorized-user.component.css']
})

export class AddAuthorizedUserComponent implements OnInit {
  userForm: any = {};
  constructor() { }

  ngOnInit() {
  }

  user(form: NgForm) {
    this.userForm.userFormName = form.value.userFormName;
    this.userForm.userFormEmail = form.value.userFormEmail;
    this.userForm.userFormPhone = form.value.userFormPhone;
    this.userForm.userFormRole = form.value.userFormRole;
    console.log(this.userForm);
  }

}
