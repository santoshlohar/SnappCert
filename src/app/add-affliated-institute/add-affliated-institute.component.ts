import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-affliated-institute',
  templateUrl: './add-affliated-institute.component.html',
  styleUrls: ['./add-affliated-institute.component.css']
})

export class AddAffliatedInstituteComponent implements OnInit {
  addInstForm: any = {};
  constructor() { }

  ngOnInit() {
  }

  addInst(form: NgForm) {
    this.addInstForm.addInstFormAffliatedInstituteId = form.value.addInstFormAffliatedInstituteId;
    this.addInstForm.addInstFormAffliatedInstituteName = form.value.addInstFormAffliatedInstituteName;
    this.addInstForm.addInstFormAffliatedInstituteId = form.value.addInstFormAffliatedInstituteId;
    this.addInstForm.addInstFormTeamScore = form.value.addInstFormTeamScore;
    this.addInstForm.addInstFormCertificate = form.value.addInstFormCertificate;
    this.addInstForm.addInstFormDataAdmin = form.value.addInstFormDataAdmin;
    this.addInstForm.addInstFormReviewer1 = form.value.addInstFormReviewer1;
    this.addInstForm.addInstFormReviewer2 = form.value.addInstFormReviewer2;
    this.addInstForm.addInstFormReviewer3 = form.value.addInstFormReviewer3;
    this.addInstForm.addInstFormApprover1 = form.value.addInstFormApprover1;
    this.addInstForm.addInstFormApprover2 = form.value.addInstFormApprover2;
    this.addInstForm.addInstFormApprover3 = form.value.addInstFormApprover3;
    console.log(this.addInstForm);
  }

}
