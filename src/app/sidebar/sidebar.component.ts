import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	
	public sidebar: any;
	userType: string;
	constructor() { }

	ngOnInit() {
		this.userType = localStorage.getItem('userType');
	}

	sidebarToggle(e) {
		console.log(e)
	}

}
