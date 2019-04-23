import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

	resetPwd: FormGroup;
	constructor(private formBuilder: FormBuilder) { }

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
}
