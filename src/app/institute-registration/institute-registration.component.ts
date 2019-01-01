import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-institute-registration',
  templateUrl: './institute-registration.component.html',
  styleUrls: ['./institute-registration.component.css']
})

export class InstituteRegistrationComponent implements OnInit {
  addInstForm: any = {};
  requesterFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.requesterFormGroup = this._formBuilder.group({
      instituteCtrl: ['', Validators.required]
    });
  }
  
  addInst(form: NgForm) {
    this.addInstForm.addInstFormName = form.value.addInstFormName;
    this.addInstForm.addInstFormDesignation = form.value.addInstFormDesignation;
    this.addInstForm.addInstFormEmployeeID = form.value.addInstFormEmployeeID;
    this.addInstForm.addInstFormEmailID = form.value.addInstFormEmailID;
    this.addInstForm.addInstFormPhoneNo = form.value.addInstFormPhoneNo;
    this.addInstForm.addInstFormInstituteType = form.value.addInstFormInstituteType;
    this.addInstForm.addInstFormInstituteID = form.value.addInstFormInstituteID;
    this.addInstForm.addInstFormInstituteName = form.value.addInstFormInstituteName;
    this.addInstForm.addInstFormRegistrationID = form.value.addInstFormRegistrationID;
    this.addInstForm.addInstFormDate = form.value.addInstFormDate;
    this.addInstForm.addInstFormAddress = form.value.addInstFormAddress;
    this.addInstForm.addInstFormAcademicHead = form.value.addInstFormAcademicHead;
    this.addInstForm.addInstFormAcademicHeadEmail = form.value.addInstFormAcademicHeadEmail;
    this.addInstForm.addInstFormAcademicHeadPhone = form.value.addInstFormAcademicHeadPhone;
    this.addInstForm.addInstFormAdministratorHead = form.value.addInstFormAdministratorHead;
    this.addInstForm.addInstFormAdministratorHeadEmail = form.value.addInstFormAdministratorHeadEmail;
    this.addInstForm.addInstFormAdministratorHeadPhone = form.value.addInstFormAdministratorHeadPhone;
    this.addInstForm.addInstFormBoardLineNo = form.value.addInstFormBoardLineNo;
    this.addInstForm.addInstFormLocation = form.value.addInstFormLocation;
    this.addInstForm.addInstFormWebsite = form.value.addInstFormWebsite;
    this.addInstForm.addInstFormAffliatedToInstitute = form.value.addInstFormAffliatedToInstitute;
    this.addInstForm.addInstFormAffliatedToInstituteType = form.value.addInstFormAffliatedToInstituteType;
    this.addInstForm.addInstFormApprovedBy = form.value.addInstFormApprovedBy;
    this.addInstForm.addInstFormRegulatoryBody = form.value.addInstFormRegulatoryBody;
    this.addInstForm.addInstFormAdminName1 = form.value.addInstFormAdminName1;
    this.addInstForm.addInstFormPhone1 = form.value.addInstFormPhone1;
    this.addInstForm.addInstFormEmailID1 = form.value.addInstFormEmailID1;
    this.addInstForm.addInstFormAdminEmployeeID1 = form.value.addInstFormAdminEmployeeID1;
    this.addInstForm.addInstFormAdminName2 = form.value.addInstFormAdminName2;
    this.addInstForm.addInstFormPhone2 = form.value.addInstFormPhone2;
    this.addInstForm.addInstFormEmailID2 = form.value.addInstFormEmailID2;
    this.addInstForm.addInstFormAdminEmployeeID2 = form.value.addInstFormAdminEmployeeID2;
    console.log(this.addInstForm);
  }

}
