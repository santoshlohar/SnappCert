import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

	resetPwd: FormGroup;
	constructor(private formBuilder: FormBuilder,
				public authService: AuthService,
				private router: Router) { }

	ngOnInit() {
		this.resetPwd = this.formBuilder.group({
			otp: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
		});
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.resetPwd.controls[controlName].hasError(errorName);		
	}

	resetPassword(form: NgForm) {
		console.log(form);
		var email = localStorage.getItem('emailId');
		var data = {
			email: email,
			password: form.value.password,
			confirmPassword: form.value.confirmPassword,
			code: form.value.otp
		}

		this.authService.resetPassword(data)
			.subscribe((result) => {
				console.log(result);
				if(result.success == true) {
					var message = "Your password updated successfully...";
					localStorage.removeItem('emailId')
					this.router.navigate(['/']);
				}
			})
	}
}
