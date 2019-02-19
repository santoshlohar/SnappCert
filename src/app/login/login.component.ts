import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthGuard } from '../services/auth-guard';
import { UserRolesService } from '../services/user-roles.service';

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
				private router: Router,
				private dialog: MatDialog,
				private roleService: UserRolesService) {}

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
				this.roleService.renderScreen(this.type);
				
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

	goToForgotPassword() {
		this.close();
		const dialogRef = this.dialog.open( ForgotPasswordComponent, {
			width: '350px',
			height: '385px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

}
