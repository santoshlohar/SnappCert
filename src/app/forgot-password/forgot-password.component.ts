import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

	forgotpassword: FormGroup;
	constructor(private formBuilder: FormBuilder,
				private authService: AuthService) { }

	ngOnInit() {
		this.forgotpassword = this.formBuilder.group({
			emailId: (['', Validators.required])
		});
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.forgotpassword.controls[controlName].hasError(errorName);		
	}

	forgotPassword(form: NgForm) {
		console.log(form);
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
					console.log(message);
				}
			})         
	}
}
