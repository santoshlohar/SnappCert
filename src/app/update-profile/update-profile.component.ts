import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: any = {};
  constructor() { }

  ngOnInit() {
  }

  profile(form: NgForm) {
    this.profileForm.profileFormType = form.value.profileFormType;
    this.profileForm.profileFormName = form.value.profileFormName;
    this.profileForm.profileFormInstName = form.value.profileFormInstName;
    this.profileForm.profileFormLoginId = form.value.profileFormLoginId;
    this.profileForm.profileFormEmail = form.value.profileFormEmail;
    this.profileForm.profileFormPhone = form.value.profileFormPhone;
    this.profileForm.profileFormAadharNo = form.value.profileFormAadharNo;
    console.log(this.profileForm);
  }

}
