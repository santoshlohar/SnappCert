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

	verify(form: NgForm) {
		console.log(form.value);
		this.tokenDetails.bsecret = this.bsecret;
		this.tokenDetails.p_token = form.value.token;
		this.tokenDetails.emailId = this.loginEmail;

		this.url = "http://localhost:3000/api/v1/verifytotp";
		console.log(this.tokenDetails)
		this.http.post(this.url, this.tokenDetails)
			.pipe(
				map((response: any) => response.json())
			)
			.subscribe((response: any) => {
				console.log(response.data);
				// if(response)
				// this.router.navigate(['/generatePassword'])
			})
	};

	sendOtp() {
		this.url = "http://localhost:3000/api/v1/totp";
		
		this.data.emailId = this.loginEmail;
		this.http.post(this.url, this.data)
			.subscribe((response: any) => {
				this.bsecret = response.data.bsecret;
			})
	};

	openDialog(): void {
		const dialogRef = this.dialog.open(NotifyOtpComponent, {
			width: '350px',
			height: '385px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
}
