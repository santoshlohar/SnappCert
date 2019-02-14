import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { UserRolesService } from '../services/user-roles.service';

@Component({
  selector: 'app-pwd-generate',
  templateUrl: './pwd-generate.component.html',
  styleUrls: ['./pwd-generate.component.css']
})
export class PwdGenerateComponent implements OnInit {
	url;
	userData;
	userType;
	passwordDetails = {
		password: '',
		confirmPassword: ''
	};

	constructor(private http: HttpClient,
				private route: ActivatedRoute,
				private router: Router,
				private authService: AuthService,
				private userRolesService: UserRolesService) {}

	ngOnInit() {
		// this.loginEmail = this.route.snapshot.queryParamMap.get('user');
		// this.bsecret = this.route.snapshot.queryParamMap.get('secret');
		this.userData = JSON.parse(localStorage.getItem('verify_user'));
		console.log(this.userData);
	};

	generatePwd(form: NgForm) {
		if(form.invalid) {
			return false;
		}
		var data = {
			emailId : this.userData.emailId,
			password: form.value.password
		};
		this.url = "http://localhost:3000/api/v1/generatepassword";

		this.http.post(this.url, data)
			.subscribe((response: any) => {
				if(response.message == 'success') {
					this.authService.login(data)
						.subscribe((response: any) => {
							this.userType = response.UserType;
							this.userRolesService.renderScreen(this.userType);
							localStorage.removeItem('verify_user')
						})
				}
			})
	};
}