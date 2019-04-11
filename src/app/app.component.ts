import { Component, Input, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserModel } from './modals/user';
import { MatSidenav } from '@angular/material';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'snapperCertificate';
	isUserLogin: UserModel;
	@ViewChild('sidenav') public sidenav: MatSidenav;
	constructor(private authService: AuthService) {
					this.authService.currentUser
						.subscribe((user) => {
							this.isUserLogin = user;
						});		
	}

	ngOnInit() {			
	}


}