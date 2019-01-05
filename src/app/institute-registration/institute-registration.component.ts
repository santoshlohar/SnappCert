import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs';
import { Observable, ObservableInput } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-institute-registration',
  templateUrl: './institute-registration.component.html',
  styleUrls: ['./institute-registration.component.css']
})

export class InstituteRegistrationComponent implements OnInit {
	addInstForm: any = {};
	requesterFormGroup: FormGroup;
	instituteFormGroup: FormGroup;
	instAdmin1FormGroup: FormGroup;
	instAdmin2FormGroup: FormGroup;
	isEditable = false;
	previousStep: any;
	currentStep:any;
	requesterDetails = {
		name: "",
		designation: "",
		employeeId: "",
		emailId: "",
		phoneNumber: "",
		userType: ""
	};
	instituteDetails = {
		type: "",
		instituteId: "",
		name: "",
		registrationId: "",
		instituteDOE: "",
		instituteAddress: "",
		instituteAcedmicHead: "",
		academiHeadEmailId: "",
		academiHeadPhoneNo: "",
		administratorHead: "",
		administratorHeadEmailId: "",
		administratorHeadPhnNo: "",
		boardLineNo: "",
		instituteLocation: "",
		instituteWebsite: "",
		AffiInstitute: "",
		AffiInstituteType: "",
		approvedBy: "",
		regulatoryBody: ""
	};

	constructor(private _formBuilder: FormBuilder, 
		private apiService: ApiService, 
		private http: HttpClient) { }

	ngOnInit(): void {
		this.requesterFormGroup = this._formBuilder.group({
			requesterName: ['', Validators.required],
			requesterDesg: ['', Validators.required],
			employeeId: ['', Validators.required],
			emailId: ['', [Validators.required, Validators.email]],
			phoneNo: ['', Validators.required]
		});
		this.instituteFormGroup = this._formBuilder.group({
			instituteType: ['', Validators.required],
			instituteId: ['', Validators.required],
			instituteName: ['', Validators.required],
			instituteRegId: ['', Validators.required],
			instituteDOE: ['', Validators.required],
			instituteAddress: ['', Validators.required],
			instituteAcedmicHead: ['', Validators.required],
			academiHeadEmailId: ['', Validators.required],
			academiHeadPhoneNo: ['', Validators.required],
			administratorHead: ['', Validators.required],
			administratorHeadEmailId: ['', Validators.required],
			administratorHeadPhnNo: ['', Validators.required],
			boardLineNo: ['', Validators.required],
			instituteLocation: ['', Validators.required],
			instituteWebsite: ['', Validators.required],
			AffiInstitute: ['', Validators.required],
			AffiInstituteType: ['', Validators.required],
			approvedBy: ['', Validators.required],
			regulatoryBody: ['', Validators.required]
		});
		this.instAdmin1FormGroup = this._formBuilder.group({
			admin1Name: ['', Validators.required],
			admin1PhnNo: ['', Validators.required],
			admin1EmailId: ['', Validators.required],
			admin1EmpId: ['', Validators.required]
		});
		this.instAdmin2FormGroup = this._formBuilder.group({
			admin2Name: ['', Validators.required],
			admin2PhnNo: ['', Validators.required],
			admin2EmailId: ['', [Validators.required, Validators.email]],
			admin2EmpId: ['', Validators.required]
		});
	}

	public hasError = (controlName: string, errorName: string) =>{
        return this.requesterFormGroup.controls[controlName].hasError(errorName);
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

	

	requesterDetailsSubmit(form: NgForm) {
		this.requesterDetails.name = form.value.requesterName;
		this.requesterDetails.designation = form.value.requesterDesg;
		this.requesterDetails.employeeId = form.value.employeeId;
		this.requesterDetails.emailId = form.value.emailId;
		this.requesterDetails.phoneNumber = form.value.phoneNo; 
		this.requesterDetails.userType = "SYSTEM_ADMIN";
		
		// if (this.requesterFormGroup.invalid) {
        //     return;
        // }
		
		this.apiService.post('/instituteUser', this.requesterDetails)
			.subscribe((response) => {
				console.log(response);
			});
	}

	instituteDetailsSubmit(form: NgForm) {
		console.log(form);
	}

}
