import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-student-view',
	templateUrl: './student-view.component.html',
	styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
	loginUser;
	userType;
	constructor() { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
	}

}
