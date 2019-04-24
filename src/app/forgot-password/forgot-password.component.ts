import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

	forgotpassword: FormGroup;
	constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
		private formBuilder: FormBuilder,
				private authService: AuthService,
				public router: Router) { }

	ngOnInit() {
		this.forgotpassword = this.formBuilder.group({
			emailId: (['', Validators.required])
		});
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.forgotpassword.controls[controlName].hasError(errorName);		
	}

	forgotPassword(form: NgForm) {
		if(form.invalid) {
			return false;
		}

		var data = {
			email: form.value.emailId
		}

		this.authService.forgotPassword(data)
			.subscribe((result: any) => {
				if(result.success == true) {
					var message = "Please check your mail for otp..";
					localStorage.setItem("emailId", data.email);
					this.dialogRef.close();
					this.router.navigate(['/resetPassword']);
				}
			})         
	}
}
