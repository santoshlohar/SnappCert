import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-pwd-generate',
  templateUrl: './pwd-generate.component.html',
  styleUrls: ['./pwd-generate.component.css']
})
export class PwdGenerateComponent implements OnInit {
	url;
	userData;
	passwordDetails = {
		password: '',
		confirmPassword: ''
	};

	constructor(private http: HttpClient,
				private route: ActivatedRoute) {}

	ngOnInit() {
		// this.loginEmail = this.route.snapshot.queryParamMap.get('user');
		// this.bsecret = this.route.snapshot.queryParamMap.get('secret');
		// console.log(this.loginEmail);
		// console.log(this.bsecret);
	};

	generatePwd(form: NgForm) {
		console.log(form)
		if(form.invalid) {
			return false;
		}
	
		this.passwordDetails.password = form.value.password;
		this.passwordDetails.confirmPassword = form.value.confirmPassword;

		console.log(this.passwordDetails);
		this.url = "http://localhost:3000/api/v1/totp";

		this.http.post(this.url, this.passwordDetails)
			.subscribe(response => {
				console.log(response);
			})
	};

}
