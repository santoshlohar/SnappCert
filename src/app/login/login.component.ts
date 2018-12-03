import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: any = {};
	constructor() { }

	ngOnInit() {
	}

	login(form: NgForm) {
		this.loginForm.email = form.value.email;
		this.loginForm.password = form.value.password;
		this.loginForm.rememberMe = form.value.rememberMe;
		console.log(this.loginForm);
	}

}
