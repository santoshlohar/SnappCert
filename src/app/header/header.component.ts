import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Input() stateRoute: string;
	constructor(public globals: Globals,
				public router: Router,
				private authService: AuthService,
				private authGuard: AuthGuard) {
					console.log(this.stateRoute);
					this.stateRoute = this.router.url;
				}

	ngOnInit() {
		// console.log(this.router.url);
	}

	ngOnViewInit() {
		console.log(this.stateRoute)
	}

	gotoLogin() {
		this.router.navigate(['/login']);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['']);
	}

}
