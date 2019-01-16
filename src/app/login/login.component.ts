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
		this.loginData.emailId = form.value.emailId;
		this.loginData.password = form.value.password;

		this.url = "/authenticateUser";

		this.apiService.post(this.url, this.loginData)
			.subscribe((response: any) => {
				this.userData = response;
				this.type = this.userData.UserType;
				localStorage.setItem('userType', this.type);

				if( this.type == 'KYC_AGENT' ) {
					this.router.navigate(['/','institutesKyc']);
				} else if (this.type == 'INST_ADMIN') {
					this.router.navigate(['/','viewInstituteDepartments']);	
				} else if (this.type == 'INS_DATA_MANAGER') {
					this.router.navigate(['/','viewInstituteAuthUsers']);	
				}
			});
	}

}
