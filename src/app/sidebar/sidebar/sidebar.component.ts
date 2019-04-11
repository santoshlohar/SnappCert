import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/modals/user';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	opened: boolean = false;
	isUserLogin: UserModel;
	@ViewChild('sidenav') public sidenav: MatSidenav;
	constructor(public sidebarService: SidebarService,
				public authService: AuthService) {
					this.authService.currentUser
						.subscribe((user) => {
							this.isUserLogin = user;
						});
	 }

	ngOnInit() {
		console.log("This Sidebar");
		this.sidebarService.setSidenav(this.sidenav);
		//console.log(this.sidenav);
	}

	ngOnChange() {
		//this.sidebarService.setSidenav(this.sidenav);
	}

}
