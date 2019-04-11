import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard';
import { Observable } from 'rxjs';
import { UserModel } from '../modals/user';
import { MatSidenav } from '@angular/material';
import { SidebarComponent } from '../sidebar/sidebar/sidebar.component';
import { SidebarService } from '../sidebar/sidebar/sidebar.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	heading: string;
	user;
	isUserLogin: UserModel;
	courseId;
	role;

	@Input() stateRoute: string;
	@ViewChild('sidenav') public sidenav;
	public sidebar: MatSidenav;
	constructor (public globals: Globals,
				public router: Router,
				private authService: AuthService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute,
				private sidebarService: SidebarService) {
					this.authService.currentUser
						.subscribe((user) => {
							this.isUserLogin = user;
						});
				}

	ngOnInit() {	
		this.user = JSON.parse(localStorage.getItem('user'));
		this.roleName(this.user.UserType);
	}

	gotoLogin() {
		this.router.navigate(['/login']);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['']);
	}

	ngDoCheck() {
		this.subHeading(this.router.url);
	}

	subHeading(url) {
		var id = url.split('/')[2];
		if(url === '/dashboard') {
			this.heading = 'My Dashboard';
		} else if(url === '/users') {
			this.heading = 'Authorized Users';
		} else if(url === '/userAdd') {
			this.heading = 'Add Users';
		} else if(url === '/institutes') {
			this.heading = 'Institutes List';
		} else if(url === '/departments') {
			this.heading = 'My Departments';
		} else if(url === '/affInstitutes') {
			this.heading = 'Aff. Institutes';
		} else if(url === '/affInstituteAdd') {
			this.heading = 'Aff. Institute';
		} else if(url === '/courses') {
			this.heading = 'Courses';
		} else if(url === '/courseAdd') {
			this.heading = 'Add Course';
		} else if(url === '/certificateUploadList') {
			this.heading = 'Certificates';
		} else if(url === '/batches/batchUploadList') {
			this.heading = 'Batches';
		} else if(id) {
			if(url == '/courseEdit/'+id) {
				this.heading = 'Course Edit';
			}
			if(url == '/certificateView/'+id) {
				this.heading = 'Certificate Data';
			}
		}
	}

	roleName(type) {
		if(type == 'SYSTEM_ADMIN') {
			this.role = 'System Admin';
		} else if(type == 'REG_REQESTER') {
			this.role = 'Requester';
		} else if(type == 'KYC_AGENT') {
			this.role = 'KYC Agent';
		} else if(type == 'INST_ADMIN') {
			this.role = 'Institute Admin';
		} else if(type == 'INS_DATA_MANAGER') {
			this.role = 'Data Manager';
		} else if(type == 'AFF_INS_DATA_MANAGER') {
			this.role = 'Data Manager';
		} else if(type == 'INST_REVIEWER') {
			this.role = 'Reviewer';
		} else if(type == 'AFF_INST_REVIEWER') {
			this.role = 'Reviewer';
		} else if(type == 'DATA_CERTIFIER') {
			this.role = 'Certifier';
		} else if(type == 'DATA_APPROVER') {
			this.role = 'Approver';
		} else if(type == 'STUDENT') {
			this.role = 'Student';
		} 
	}

	openSidebar() {
		this.sidebarService.toggle();
	}

}
