import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-institute-kyc-details',
  templateUrl: './institute-kyc-details.component.html',
  styleUrls: ['./institute-kyc-details.component.css']
})
export class InstituteKycDetailsComponent implements OnInit {
	kycForm: any = {};
	instituteId = '';
	apiUrl;
	instituteData: {
		requesterName: '',
		requesteremailId: '',
		requesterphoneNo: '',
		instituteType: '',
		instituteId: '';
		instituteName: '',
		registrationId: '',
		establishmentDate: '',
		address1: '',
		address2: '',
		state: '',
		city: '',
		administratorName: '',
		administratorEmailId: '',
		boardLineNumber: '',
		location: '',
		website: '',
		recognizedBy: '',
		InstAdminName: '',
		InstAdminEmailId: '',
		InstAdminPhoneNo: '',
		kycAgentId: '',
		kycStatus: ''
	};

	instituteDetailForm: FormGroup;
	constructor(private _formBuilder: FormBuilder,
		private apiService: ApiService,
		private route: ActivatedRoute) { 
			this.route.paramMap.subscribe(params => {
				this.instituteId = params.get('id');
			})
		}

	ngOnInit() {

		this.getInstituteData();
		this.instituteDetailForm = this._formBuilder.group({
			requesterName: [{value:'', disabled: true}],
			requesteremailId: new FormControl ({value: '', disabled: true}),
			requesterphoneNo: [{value: '', disabled: true}],
			instituteType: [{value: '', disabled: true}],
			instituteId: [{value: ''}, Validators.required],
			instituteName : [{value: '', disabled: true}],
			registrationId: [{value: ''}, Validators.required],
			establishmentDate: [{value: ''}, Validators.required],
			address1: [{value: ''}, Validators.required],
			address2: [{value: ''}],
			state: [{value: ''}, Validators.required],
			city: [{value: ''}, Validators.required],
			administratorName: [{value: ''}, Validators.required],
			administratorEmailId: [{value: ''}, Validators.required],		
			boardLineNumber: [{value: ''}, Validators.required],		
			location: [{value: ''}, Validators.required],		
			website: [{value: ''}, Validators.required],		
			recognizedBy: [{value: ''}, Validators.required],		
			InstAdminName: [{value: ''}, Validators.required],		
			InstAdminEmailId: [{value: ''}, Validators.required],
			InstAdminPhoneNo: [{value: ''}, Validators.required],
			kycAgentId: [{value: ''}, Validators.required],
			kycStatus: [{value: ''}, Validators.required],
			kycComments: [{value: ''}, Validators.required]
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

	getInstituteData() {
		console.log("Single Institute - " + this.instituteId);
		this.apiUrl = '/institutes/';
		this.apiService.get(this.apiUrl + this.instituteId)
			.pipe(
				tap((institute: object) => {
						this.instituteDetailForm.patchValue(institute["body"])
					})
			)
			.subscribe((response)=> {
				console.log(response);
			}
		);								
	}

}
