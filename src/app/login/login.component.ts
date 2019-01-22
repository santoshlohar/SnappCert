import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs';
import { ApiService} from '../services/api.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { AuthService } from '../services/auth.service';

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
	

	constructor(private apiService: ApiService, 
		private router: Router,
		public globals: Globals,
		private authService: AuthService) { }

	ngOnInit() {
	}

	userLogin(form) {
		this.loginData.emailId = form.value.emailId;
		this.loginData.password = form.value.password;
		 
		this.authService.login(this.loginData)
			.subscribe((response) => {
				console.log(response);
				this.userData = response;
	 			this.type = this.userData.UserType;
				this.globals.isUserLoggedIn = true;

				if( this.type == 'KYC_AGENT' ) {
					this.router.navigate(['/','institutes']);
				} else if (this.type == 'INST_ADMIN') {
					this.router.navigate(['/','departments']);	
				} else if (this.type == 'INS_DATA_MANAGER') {
					this.router.navigate(['/','courses']);	
				}
			})
	};

}
