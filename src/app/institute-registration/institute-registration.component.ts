import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
	selector: 'app-institute-registration',
	templateUrl: './institute-registration.component.html',
	styleUrls: ['./institute-registration.component.css'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
	}]
})
export class InstituteRegistrationComponent implements OnInit {

	url;
	reqesterFormGroup: FormGroup;
	instituteFormGroup: FormGroup;
	adminFormGroup: FormGroup;
	constructor(private http: HttpClient,
				private _formBuilder: FormBuilder, 
				private router: Router,
				private location: Location) { }

	ngOnInit() {

		this.reqesterFormGroup = this._formBuilder.group({
			requesterName: ['', Validators.required],
			requesterEmail: ['', Validators.required],
			requesterPhone: ['', Validators.required]
		});
		this.instituteFormGroup = this._formBuilder.group({
			instType: ['', Validators.required],
			code: [''],
			instituteName: ['', Validators.required],
			establishDate: ['', Validators.required],
			address1: [''],
			address2: [''],
			state: [''],
			city: [''],
			academicHead: [''],
			academicHeadEmail: [''],
			academicHeadPhone: [''],
			administratorHead: [''],
			administratorHeadEmail: [''],
			administratorHeadPhone: [''],
			boardLineNo: [''],
			location: [''],
			website: [''],
			affiliatedTo: [''],
			affiliatedToType: [''],
			approvedBy: [''],
			regulatoryBody: ['']
		});
		this.adminFormGroup = this._formBuilder.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required]
		});
    }

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.instituteFormGroup.controls[controlName].hasError(errorName);		
	}

	registerInstitute(requester: NgForm, institute: NgForm, admin: NgForm) {
		if (requester.invalid || institute.invalid || admin.invalid) {
			return false;
		}
		var data = {
			type: institute.value.instType,
			code: institute.value.code,
			name: institute.value.instituteName,
			doe: institute.value.establishDate,
			address: {
				address_line_1: institute.value.address1,
				address_line_2: institute.value.address2,
				state: institute.value.state,
				city: institute.value.city
			},
			requester: {
				name: requester.value.requesterName,
				email: requester.value.requesterEmail,
				phoneNumber: requester.value.requesterPhone
			},
			head: {
				name: institute.value.academicHead,
				email: institute.value.academicHeadEmail,
				phoneNumber: institute.value.academicHeadPhone
			},
			administrator: {
				name: institute.value.administratorHead,
				email: institute.value.administratorHeadEmail,
				phoneNumber: institute.value.administratorHeadPhone,
				landineNumber: institute.value.boardLineNo
			},
			location: institute.value.location,
			website: institute.value.website,
			affiliateInstitute: {
				name: institute.value.affiliatedTo,
				type: institute.value.affiliatedToType,
				approvedBy: institute.value.approvedBy,
				requlatoryBody: institute.value.regulatoryBody,
			},
			instituteAdmin: {
				name: admin.value.name,
				email: admin.value.email,
				phoneNumber: admin.value.phone
			}
		}

		console.log(data);
		
		this.url = 'http://localhost:3000/api/v1/institute/register';

		this.http.post(this.url, data)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.router.navigate(['/']);
				}       
            });
	}

	goBack() {
		this.location.back();
	}	

}
