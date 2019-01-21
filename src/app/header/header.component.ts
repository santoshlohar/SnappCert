import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public globals: Globals,
				public router: Router) { }

	ngOnInit() {
	}

	logout() {
		console.log(this.globals.isUserLoggedIn);
		localStorage.removeItem('user');
		this.globals.isUserLoggedIn = false;
		this.router.navigate(['/']);
	}

}
