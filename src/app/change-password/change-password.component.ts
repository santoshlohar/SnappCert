import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any = {};
  constructor() { }

  ngOnInit() {
  }

  changePassword(form: NgForm) {
    this.changePasswordForm.password = form.value.password;
    this.changePasswordForm.newPassword = form.value.newPassword;
    this.changePasswordForm.confirmPassword = form.value.confirmPassword;
    console.log(this.changePasswordForm);
  }

}
