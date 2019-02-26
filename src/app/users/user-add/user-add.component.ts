import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

	url: String;
	user = {
		userName: '',
		type: '',
		emailId: '',
		phoneNumber: '',
		referredBy: '',
		countryName: '',
		Institution_ID: '',
		Affliated_Institute_ID: '',
		Department_ID: ''
	};
	loginUser;
	role;
	authUserForm: FormGroup;

	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService) { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loginUser.UserType;
		console.log(this.role)
		this.authUserForm = this._formBuilder.group({
			userType: ['', Validators.required],
			institute_ID: ['', Validators.required],
			department_ID: ['', Validators.required],
			name: ['', Validators.required],
			emailId: ['', Validators.required],
			phone: ['', Validators.required],
		});
	}

	addUser(userData: NgForm) {
		console.log(userData)
		if(userData.invalid) {
			return false;
		}
		this.url = '/user';
		this.user.userName = userData.value.name;
		this.user.type =  userData.value.userType;
		this.user.emailId =  userData.value.emailId;
		this.user.phoneNumber =  userData.value.phone;
		this.user.referredBy =  this.loginUser.UserName;
		this.user.countryName =  "India";
		this.user.Institution_ID = userData.value.institute_ID;
		this.user.Department_ID = userData.value.department_ID;
		this.user.Affliated_Institute_ID =  '';

		console.log(this.user);

		// this.apiService.post(this.url, this.user)
		// 	.subscribe((response) => {
		// 		console.log(response);
		// 	})
	}

}
