import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

	url: String;
	user: any = {
		userName: '',
		type: '',
		emailId: '',
		phone: '',
		referredBy: '',
		instituteId: '',
		Affliated_Institute_ID: '',
		departmentId: ''
	};
	loggedInUser;
	role;
	admin: boolean;
	inst_id;
	affInst_Id;
	departments:[]=[];
	authUserForm: FormGroup;
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.role;
		this.inst_id = this.loggedInUser.instituteId;
		if(this.loggedInUser.Affliated_Institute_ID != '') {
			this.affInst_Id = this.loggedInUser.Affliated_Institute_ID;
		}
		this.getDeptList();
		this.authUserForm = this._formBuilder.group({
			userRole: ['', Validators.required],
			departmentId: [''],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			emailId: ['', Validators.required],
			phone: ['', Validators.required],
			countryName: [''],
			referredBy: [''],
		});
	}

	addUser(userData: NgForm) {
		if(userData.invalid) {
			return false;
		}
		this.url = '/user/create';
		this.user.firstName = userData.value.firstName;
		this.user.lastName = userData.value.lastName;
		this.user.role =  userData.value.userRole;
		this.user.email =  userData.value.emailId;
		this.user.phoneNumber =  userData.value.phone;
		this.user.referredBy =  this.loggedInUser.UserName;
		this.user.instituteId = this.inst_id;

		if(userData.value.departmentId != "") {
			this.user.departmentId = userData.value.departmentId;
		} else {
			this.user.departmentId = "";
		}
		if(this.role == "AFF_INS_DATA_MANAGER") {
			this.user.Affliated_Institute_ID = this.affInst_Id;
		} else {
			this.user.Affliated_Institute_ID =  '';
		}

		this.apiService.post(this.url, this.user)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.router.navigate(['/users']);
				}
			})
	}

	getDeptList() {
		this.url = "/department/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.inst_id);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					if(response.data) {
						this.departments = response.data; 
					}
				}
			})
	}

	roleChange(role) {
		if(role = "institute_admin") {
			this.admin = true;
		} else {
			this.admin = false;
		}
	}

	// checkType(type) {
	// 	console.log(type.value)
	// 	console.log("1")
	// 	if(type.value == 'INS_DATA_MANAGER') {
	// 		this.noDept = false;
	// 		console.log(this.noDept)
	// 	} else {
	// 		this.noDept = true;
	// 		console.log(this.noDept)
	// 	}
	// }

	goBack() {
		this.location.back();
	}
}
