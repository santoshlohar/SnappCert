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
	affiliate: boolean;
	superManager: boolean = false;
	inst_id;
	affInst_Id;
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
		console.log(this.admin);
		if(this.role == 'manager' && this.entity == 'institute') {
			this.superManager = true;
			console.log(this.superManager);
		} 
		this.inst_id = this.loggedInUser.reference.instituteId;
		this.getDepartments();
		this.getAffiliates();
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

	addUser(userData: NgForm) {
		if(userData.invalid) {
			return false;
		}
		console.log(userData);
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
		} 
		// if(userData.value.affiliateId != "") {
		// 	this.user.affiliateId = this.affInst_Id;
		// } else {
		// 	this.user.affiliateId =  '';
		// }
		console.log(this.user);
		// this.apiService.post(this.url, this.user)
		// 	.subscribe((response: any) => {
		// 		if(response.success == true) {
		// 			this.router.navigate(['/users']);
		// 		}
		// 	})
	}

	getDepartments() {
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
			});
	}

	getAffiliates() {
		this.url = "/affiliate/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.inst_id);
		params = params.append('skip', '0');
		params = params.append('limit', '50');

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					if(response.data) {
						this.affiliates = response.data; 
						console.log(this.affiliates);
					}
				}
			});
	}

	roleChange(role) {
		if(role == "admin") {
			this.admin = true;
		} else {
			this.admin = false;
		}
	}

	typeChange(type) {
		if(type == "institute") {
			this.affiliate = false;
		} else {
			this.affiliate = true;
		}
	}

	goBack() {
		this.location.back();
	}
}
