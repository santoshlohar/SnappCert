import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-institute-kyc-details',
  templateUrl: './institute-kyc-details.component.html',
  styleUrls: ['./institute-kyc-details.component.css']
})
export class InstituteKycDetailsComponent implements OnInit {
  kycForm: any = {};
  constructor() { }

  ngOnInit() {
  }

  kyc(form: NgForm) {
    this.kycForm.instituteType = form.value.instituteType;
    this.kycForm.intituteId = form.value.intituteId;
    this.kycForm.intituteName = form.value.intituteName;
    this.kycForm.instituteReq = form.value.instituteReq;
    this.kycForm.instituteKycAgent = form.value.instituteKycAgent;
    this.kycForm.institutionStatus = form.value.institutionStatus;
    console.log(this.kycForm);
  }
  
}
