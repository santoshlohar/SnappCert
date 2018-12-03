import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-create-id',
	templateUrl: './create-id.component.html',
	styleUrls: ['./create-id.component.css']
})
export class CreateIdComponent implements OnInit {
	createIdForm: any = {};

	constructor() { }

	ngOnInit() {
	}

	createId(form: NgForm) {
		this.createIdForm.emailId = form.value.email;
		this.createIdForm.password = form.value.password;
		this.createIdForm.confirmPassword = form.value.confirmPassword; 
		console.log(this.createIdForm);
	}
}
