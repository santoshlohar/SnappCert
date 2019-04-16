import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/modals/user';
import { MatSidenav } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from './sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	isUserLogin: UserModel;
	@ViewChild('sidenav') public sidenav: MatSidenav;

	constructor(public authService: AuthService,
				public sidebarService: SidebarService) {
					this.authService.currentUser
						.subscribe((user) => {
							this.isUserLogin = user;
						})
				}

	ngOnInit() {
		this.sidebarService.setSidenav(this.sidenav);
	}

	close() {
		this.sidebarService.close();
	}

}
