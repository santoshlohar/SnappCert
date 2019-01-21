import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	public sidebar: any;
	loggedInUser;
	userType: string;
	constructor() { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loggedInUser.UserType;
		console.log(this.userType);
	}

	sidebarToggle(e) {
		console.log(e)
	}
}
