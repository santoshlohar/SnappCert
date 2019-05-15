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
		firstName: '',
		lastName: '',
		role: '',
		entity: '',
		email: '',
		phoneNumber: '',
		instituteId: '',
		affiliateId: '',
		departmentId: ''
	};
	loggedInUser;
	role;
	entity;
	admin: boolean = false;
	institute: boolean = false;
	superManager: boolean = false;
	affiliateManager: boolean = false;
	departmentError: boolean = true;
	inst_id;
	departments:[]=[];
	affiliates:[]=[];
	authUserForm: FormGroup;
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;		
		this.entity = this.loggedInUser.reference.entity;
		if(this.role == 'manager' && this.entity == 'institute') {
			this.superManager = true;
		}
		if(this.role == 'manager' && this.entity == 'affiliate') {
			this.affiliateManager = true;
		} 
		this.inst_id = this.loggedInUser.reference.instituteId;
		this.getDepartments();
		this.getAffiliates(this.loggedInUser.reference.departmentId);
		this.authUserForm = this._formBuilder.group({
			role: ['', Validators.required],
			entity: ['', Validators.required],
			departmentId: [''],
			affiliateId: [''],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			phoneNumber: ['', Validators.required]
		});
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.authUserForm.controls[controlName].hasError(errorName);		
	}

	addUser(userData: NgForm) {

		if(userData.invalid) {
			return false;
		}

		this.url = '/user/create';
		this.user.firstName = userData.value.firstName;
		this.user.lastName = userData.value.lastName;
		this.user.role =  userData.value.role;
		this.user.email =  userData.value.email;
		this.user.phoneNumber =  userData.value.phoneNumber;
		this.user.instituteId = this.inst_id;
		this.user.entity = userData.value.entity;

		if(userData.value.departmentId == "" && this.superManager) {
			this.user.departmentId = this.loggedInUser.reference.departmentId;
		} else {
			this.user.departmentId = userData.value.departmentId;
		};

		if(userData.value.affiliateId == "" && this.affiliateManager) {
			this.user.affiliateId = this.loggedInUser.reference.affiliateId;
		} else {
			this.user.affiliateId = userData.value.affiliateId;
		};

		// var errors = this.userValidation(userData);
		// if(errors) {
		// 	return false;
		// }
		console.log(this.user);
		this.apiService.post(this.url, this.user)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.router.navigate(['/users']);
				}
			});
	}

	userValidation(user) {
		console.log(user);
		// if(user.value.role == 'manager' && !(user.value.departmentId)) {
		// 	console.log("error", this.authUserForm);
		// 	this.departmentError = true;
		// 	this.hasError('departmentId', 'required');
		// }
		// return this.departmentError;
	}

	getDepartments() {
		this.url = "/department/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.inst_id);
		params = params.append('skip', '0');
		params = params.append('limit', '50');

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					if(response.data) {
						this.departments = response.data; 
					}
				}
			});
	}

	getAffiliates(departmentId) {
		this.url = "/affiliate/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.inst_id);
		params = params.append('skip', '0');
		params = params.append('limit', '50');

		if(departmentId !== "111111111111111111111111") {
			params = params.append('departmentId', departmentId);
		}

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					if(response.data) {
						this.affiliates = response.data; 
					}
				}
			});
	}

	roleChange(role, form: NgForm) {
		if(role == "admin") {
			this.admin = true;
			if(form.value.role == 'admin') {
				form.value.departmentId = "";
				form.value.affiliateId = "";
			}
		} else {
			this.admin = false;
		}
	}

	typeChange(type, form: NgForm) {
		if(type == "institute") {
			this.institute = true;
			if(form.value.entity == 'institute') {
				form.value.affiliateId = "";
			}
		} else {
			this.institute = false;
		}
	}

	departmentChange(departmentId) {
		this.getAffiliates(departmentId);
	}

	goBack() {
		this.location.back();
	}
}
