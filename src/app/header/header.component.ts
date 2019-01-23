import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public globals: Globals,
				public router: Router,
				private authService: AuthService) { }

	ngOnInit() {
	}

	gotoLogin() {
		this.router.navigate(['/login']);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

}
