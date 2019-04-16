import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { NotifyOtpComponent } from '../dialog-boxes/notify-otp.component';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
	url;
	tokenDetails = {
		p_token: '',
		bsecret: '',
		emailId: ''
	};
	data = {
		emailId: ''
	}
	verify_user = {
		emailId: '',
		userType: '',
		userName: '',
		institutionId: '',
		departmentId: '',
		affliatedInstituteId: '',
		activated: ''
	}
	temp: Object = {
	};
	loginEmail;
	bsecret;
	p_token;
	constructor(private route: ActivatedRoute,
				private http: HttpClient,
				public dialog: MatDialog,
				private router: Router) { }

	ngOnInit() {
		this.loginEmail = this.route.snapshot.queryParamMap.get('user');
		this.bsecret = this.route.snapshot.queryParamMap.get('secret');
		this.sendOtp();
		// this.openDialog();
	}

	saveVerifyUser(user) {
		localStorage.setItem('verify_user', user);
	}

	verify(form: NgForm) {
		console.log(form.value);
		this.tokenDetails.bsecret = this.bsecret;
		this.tokenDetails.p_token = form.value.token;
		this.tokenDetails.emailId = this.loginEmail;

		this.url = "http://localhost:3000/api/v1/verifytotp";
		this.http.post(this.url, this.tokenDetails)
			.subscribe((response: any) => {
				console.log(response);
				if(response.message == 'success') {
					this.verify_user.emailId = response.data.emailId;
					this.verify_user.userType = response.data.UserType;
					this.verify_user.userName = response.data.UserName;
					this.verify_user.institutionId = response.data.Institution_ID;
					this.verify_user.departmentId = response.data.Department_ID;
					this.verify_user.affliatedInstituteId = response.data.Affliated_Institute_ID;
					this.verify_user.activated = response.data.activated;
					this.saveVerifyUser(JSON.stringify(this.verify_user));
					this.router.navigate(['/generatePassword'])
				} else {
					console.log(response.message)
				}
				
			});
	};

	sendOtp() {
		this.url = "http://localhost:3000/api/v1/totp";
		
		this.data.emailId = this.loginEmail;
		this.http.post(this.url, this.data)
			.subscribe((response: any) => {
				this.bsecret = response.data.bsecret;
			});
	};

	openDialog(): void {
		const dialogRef = this.dialog.open(NotifyOtpComponent, {
			width: '350px',
			height: '385px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	};
}
