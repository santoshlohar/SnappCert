import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-institute-registration',
	templateUrl: './institute-registration.component.html',
	styleUrls: ['./institute-registration.component.css']
})
export class InstituteRegistrationComponent implements OnInit {

	url;
	instRequestForm: FormGroup;

	constructor(private http: HttpClient,
				private _formBuilder: FormBuilder, 
				private router: Router) { }

	ngOnInit() {
		this.instRequestForm = this._formBuilder.group({
			requesterName: ['', Validators.required],
			requesterEmail: ['', Validators.required],
			requesterPhone: ['', Validators.required],
			instType: ['', Validators.required],
			instituteID: [''],
			instituteName: [''],
			establishDate: [''],
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
			recognizedBy: [''],
			regulatoryBody: [''],
			name: [''],
			email: [''],
			phone: ['']
		});
	}

	public hasError = (controlName: string, errorName: string) =>{
        return this.instRequestForm.controls[controlName].hasError(errorName);
    }

	registerInstitute(regForm: NgForm) {
		console.log(regForm.value);
		if (regForm.invalid) {
			return;
		}
		var data = {
			requesterName : regForm.value.requesterName,
			requesteremailId : regForm.value.requesterEmail,
			requesterphoneNo : regForm.value.requesterPhone,
			instituteName : regForm.value.instituteName,
			instituteType : regForm.value.instType,
			instituteId : regForm.value.instituteID,
			establishmentDate : regForm.value.establishDate,
			address1 : regForm.value.address1,
			address2 : regForm.value.address2,
			state : regForm.value.state,
			city : regForm.value.city,
			academicHeadName : regForm.value.academicHead,
			academicHeadEmailId : regForm.value.academicHeadEmail,
			academicHeadPhone : regForm.value.academicHeadPhone,
			administratorName : regForm.value.administratorHead,
			administratorEmailId : regForm.value.administratorHeadEmail,
			administratorPhone : regForm.value.administratorHeadPhone,
			boardLineNumber : regForm.value.boardLineNo,
			location : regForm.value.location,
			website : regForm.value.website,
			affiliatedTo : regForm.value.affiliatedTo,
			affiliatedInstituteType : regForm.value.affiliatedToType,
			recognizedBy : regForm.value.recognizedBy,
			regulatoryBodyName : regForm.value.regulatoryBody,
			InstAdminName : regForm.value.name,
			InstAdminEmailId : regForm.value.email,
			InstAdminPhoneNo : regForm.value.phone
		}
		
		this.url = 'http://localhost:3000/api/v1/registerInstitute';

		this.http.post(this.url, data)
			.subscribe((response: any) => {
				if(response.message == 'success') {
					this.router.navigate(['/home']);
				}
			},
			(error) => {
				console.log(error);
			});
	}
	

}
