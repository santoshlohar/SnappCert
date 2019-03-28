import { Component, Input } from '@angular/core';
import { AuthGuard } from './services/auth-guard';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'snapperCertificate';
	@Input() stateRoute: string;
	loggedIn;
	constructor(private authGuard: AuthGuard) {
	}

	ngOnInit() {
		this.loggedIn = this.authGuard.canActivate;
	}

}