import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs';
import { ApiService} from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	loginData: any = {};
	url: string;
	userData: any;
	type: string;
	@ViewChild('login') login;

	constructor(private apiService: ApiService, private router: Router) { }

	ngOnInit() {

	}

	userLogin(form: NgForm) {
		this.loginData.userName = form.value.userName;
		this.loginData.password = form.value.password;

		this.url = "/authenticateUser";

		this.apiService.post(this.url, this.loginData)
			.subscribe((response: any) => {
				this.userData = response;
				this.type = this.userData.userType;

				localStorage.setItem('user', this.userData);

				if( this.type == 'KYC_AGENT') {
					console.log("Kyc agent Login");
					this.router.navigate(['/','institutesKyc']);
				}
			});
	}

}
