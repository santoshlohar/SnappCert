import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

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
		instituteID: '',
		Affliated_Institute_ID: '',
		Department_ID: ''
	};
	loginUser;
	role;
	inst_id;
	affInst_Id;
	departments:[]=[];
	authUserForm: FormGroup;

	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router) { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loginUser.UserType;
		this.inst_id = this.loginUser.instituteID;
		if(this.loginUser.Affliated_Institute_ID != '') {
			this.affInst_Id = this.loginUser.Affliated_Institute_ID;
		}
		console.log(this.role);
		this.getDeptList();
		this.authUserForm = this._formBuilder.group({
			userType: ['', Validators.required],
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
		this.user.instituteID = this.inst_id;
		this.user.Department_ID = userData.value.department_ID;
		if(this.role == "AFF_INS_DATA_MANAGER") {
			this.user.Affliated_Institute_ID = this.affInst_Id;
		} else {
			this.user.Affliated_Institute_ID =  '';
		}

		console.log(this.user);

		this.apiService.post(this.url, this.user)
			.subscribe((response: any) => {
				console.log(response);
				if(response.message == "User created successfully.") {
					this.router.navigate(['/users']);
				}
			})
	}

	getDeptList() {
		this.url = "/departmentByInst/";
		var params = '';
		this.apiService.get(this.url+ this.inst_id, params)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error)
			})
	}

}
