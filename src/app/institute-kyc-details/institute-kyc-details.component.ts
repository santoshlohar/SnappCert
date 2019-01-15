import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-institute-kyc-details',
  templateUrl: './institute-kyc-details.component.html',
  styleUrls: ['./institute-kyc-details.component.css']
})
export class InstituteKycDetailsComponent implements OnInit {
	kycForm: any = {};

	instituteDetailForm: FormGroup;
	constructor(private _formBuilder: FormBuilder) { }

	ngOnInit() {
		this.instituteDetailForm = this._formBuilder.group({
			requesterName: [{value: 'abc', disabled: true}],
			requesterEmail: [{value: 'abc', disabled: true}],
			requesterPhn: [{value: 'abc', disabled: true}],
			instituteType: [{value: 'aaa', disabled: true}],
			instituteId: ['', Validators.required],
			instituteName : [{value: 'and', disabled: true}],
			registrationId: ['', Validators.required],
			doe: ['', Validators.required],
			address1: ['', Validators.required],
			address2: '',
			state: ['', Validators.required],
			city: ['', Validators.required],
			administratorHead: ['', Validators.required],
			administratorHeadEmail: ['', Validators.required],		
			boardlineNo: ['', Validators.required],		
			location: ['', Validators.required],		
			website: ['', Validators.required],		
			recogniser: ['', Validators.required],		
			adminName: ['', Validators.required],		
			adminEmail: ['', Validators.required],
			adminPhn: ['', Validators.required],
			agentName: ['', Validators.required],
			kycStatus: ['', Validators.required]
		});
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
