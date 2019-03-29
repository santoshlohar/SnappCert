import { Component, Input } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './modals/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'snapperCertificate';
	isUserLogin: User;
	@Input() isUserLoggedIn: boolean;
	loggedIn;
	constructor(private authService: AuthService) {
					this.authService.currentUser
						.subscribe((user) => {
							this.isUserLogin = user;
						});		
	}

	ngOnInit() {			
	}


}