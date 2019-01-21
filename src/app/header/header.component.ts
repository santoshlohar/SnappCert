import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	loggedInUser;
	constructor(public globals: Globals) { }

	ngOnInit() {
		this.loggedInUser = this.globals.isUserLoggedIn;
	}

	

}
