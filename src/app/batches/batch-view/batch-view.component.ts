import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-batch-view',
	templateUrl: './batch-view.component.html',
	styleUrls: ['./batch-view.component.css']
})
export class BatchViewComponent implements OnInit {

	loginUser;
	userType;
	constructor() { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
	}

}
