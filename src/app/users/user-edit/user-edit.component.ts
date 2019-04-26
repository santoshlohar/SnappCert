import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

	url;
	id;
	inst_id;
	affInst_Id
	loginUser;
	user;
	role;
	departments:[]=[];
	UserData = {
	UserType: '',
	department_ID:'',
	UserName: '',
	emailId: '',
	phoneNumber: '',
	};
	editUserForm: FormGroup;
	constructor(private formBuilder: FormBuilder,
				private apiService: ApiService,
				private route: ActivatedRoute,
				private router: Router,
				private location: Location) { 
				}

	ngOnInit() {
		this.id = this.route.snapshot.params['userId'];
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loginUser.UserType;
		this.inst_id = this.loginUser.instituteID;
		if (this.loginUser.Affliated_Institute_ID != '') {
			this.affInst_Id = this.loginUser.Affliated_Institute_ID;
		}
		// this.getUserById(this.id);
		// this.getDeptList();
		this.editUserForm = this.formBuilder.group({
			UserType: ['', Validators.required],
			department_ID: [''],
			UserName: ['', Validators.required],
			emailId: ['', Validators.required],
			phoneNumber: ['', Validators.required]
		});
	}

	// getUserById(id) {
	// 	this.url = "/user/";
	// 	this.apiService.get(this.url+id)
	// 		.subscribe((response) => {
	// 			if (response.message == 'success' && response.data != '') {
	// 				this.user = response.data;
	// 				console.log("this.user: " + JSON.stringify(this.user));
	// 				this.editUserForm.patchValue(this.user);
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		});
	// }

	// getDeptList() {
	// 	this.url = "/departmentByInst/";
	// 	this.apiService.get(this.url+ this.inst_id)
	// 		.subscribe((response) => {
	// 			if(response.message == 'success') {
	// 				if(response.data) {
	// 					this.departments = response.data; 
	// 				}
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log(error)
	// 		})
	// }

	editUser(data: NgForm) {
		this.url = "/user/";
		this.UserData.UserType = data.value.UserType;
		this.UserData.department_ID = data.value.department_ID;
		this.UserData.UserName = data.value.UserName;
		this.UserData.emailId = data.value.emailId;
		this.UserData.phoneNumber = data.value.phoneNumber;

		this.apiService.put(this.url+this.id, this.UserData)
			.subscribe((response) => {
				if (response.message == 'success') {
					this.router.navigate(['/users']);
				} else {
					var errmsg = response.error.msg;
					alert(errmsg);
				}
			},
			(error) => {
				console.log(error);
			});
	}

	goBack() {
		this.location.back();
	}

}
