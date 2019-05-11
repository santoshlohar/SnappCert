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
	entity: string;
	affiliateId;
	constructor() { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		if(this.loggedInUser.reference.affiliateId) {
			this.affiliateId = this.loggedInUser.reference.affiliateId;
		}
	}

	sidebarToggle(e) {
		console.log(e)
	}

}
