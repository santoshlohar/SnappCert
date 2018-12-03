import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	resetPwdForm: any = {};
	constructor() { }

	ngOnInit() {
	}

	resetPassword(form : NgForm) {
		this.resetPwdForm.newPwd = form.value.newPassword;
		this.resetPwdForm.confirmPwd = form.value.confirmPassword;
		console.log(this.resetPwdForm);
	}

}
