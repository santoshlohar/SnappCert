import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs';

@Component({
	selector: 'app-institute-registration',
	templateUrl: './institute-registration.component.html',
	styleUrls: ['./institute-registration.component.css']
})
export class InstituteRegistrationComponent implements OnInit {

	intReg: any = {
		requester_Name: '', requester_Email: '', requester_Phone: '', inst_Type: '', institute_ID: '', institute_Name: '', establish_Date: '', 
		address_1: '', address_2: '', State: '', City: '', academic_Head: '', academic_Head_Email: '', academic_Head_Phone: '', administrator_Head: '',
		administrator_Head_Email: '', administrator_Head_Phone:'', boardLine_No: '', Location: '', Website: '', affiliated_To: '', affiliated_To_Type: '',
		recognized_By: '', regulatory_Body: '', Name: '', Email: '', Phone: ''
	};
	url;
	instRequestForm: FormGroup;

	constructor(private _formBuilder: FormBuilder, 
		) { }

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
		console.log(regForm);
		if (regForm.invalid) {
			return;
		}
		this.url = '/registration';

		this.intReg.requester_Name = regForm.value.requesterName;
		this.intReg.requester_Email = regForm.value.requesterEmail;
		this.intReg.requester_Phone = regForm.value.requesterPhone;
		this.intReg.inst_Type = regForm.value.instType;
		this.intReg.institute_ID = regForm.value.instituteID;
		this.intReg.institute_Name = regForm.value.instituteName;
		this.intReg.establish_Date = regForm.value.establishDate;
		this.intReg.address_1 = regForm.value.address1;
		this.intReg.address_2 = regForm.value.address2;
		this.intReg.State = regForm.value.state;
		this.intReg.City = regForm.value.city;
		this.intReg.academic_Head = regForm.value.academicHead;
		this.intReg.academic_Head_Email = regForm.value.academicHeadEmail;
		this.intReg.academic_Head_Phone = regForm.value.academicHeadPhone;
		this.intReg.administrator_Head = regForm.value.administratorHead;
		this.intReg.administrator_Head_Email = regForm.value.administratorHeadEmail;
		this.intReg.administrator_Head_Phone = regForm.value.administratorHeadPhone;
		this.intReg.boardLine_No = regForm.value.boardLineNo;
		this.intReg.Location = regForm.value.location;
		this.intReg.Website = regForm.value.website;
		this.intReg.affiliated_To = regForm.value.affiliatedTo;
		this.intReg.affiliated_To_Type = regForm.value.affiliatedToType;
		this.intReg.recognized_By = regForm.value.recognizedBy;
		this.intReg.regulatory_Body = regForm.value.regulatoryBody;
		this.intReg.Name = regForm.value.name;
		this.intReg.Email = regForm.value.email;
		this.intReg.Phone = regForm.value.phone;
		console.log(this.intReg);
	}
	

}
