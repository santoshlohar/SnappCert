import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-page-sidebar',
	templateUrl: './page-sidebar.component.html',
	styleUrls: ['./page-sidebar.component.css']
})
export class PageSidebarComponent implements OnInit {

	public sidebar: any;
	loggedInUser;
	role: string;
	constructor() { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.role;
	}

	sidebarToggle(e) {
		console.log(e)
	}

}
