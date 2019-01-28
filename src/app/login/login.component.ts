import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	userLogin: FormGroup;
	loginData: any = {};
	url: string;
	userData: any;
	type: string;

	constructor(public dialogRef: MatDialogRef<LoginComponent>,
				
				private formBuilder: FormBuilder,
				private authService: AuthService,
				private router: Router) {}

	ngOnInit() {
		this.userLogin = this.formBuilder.group({
			emailId: (['', Validators.required]),
			password: (['', Validators.required])
		});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	login(form: NgForm) {
		this.loginData.emailId = form.value.emailId;
		this.loginData.password = form.value.password;
		 
		this.authService.login(this.loginData)
			.subscribe((response) => {
				this.userData = response;
				this.type = this.userData.UserType;

				if( this.type == 'KYC_AGENT' ) {
					this.router.navigate(['/','institutes']);
				} else if (this.type == 'INST_ADMIN') {
					this.router.navigate(['/','departments']);	
				} else if (this.type == 'INS_DATA_MANAGER') {
					this.router.navigate(['/','courses']);	
				}

				this.dialogRef.close();
			},
			(error) => {
				console.log(error);
			}
			)
	};

	close() {
		this.dialogRef.close();
	}

}
