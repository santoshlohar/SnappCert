import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard';
import { Observable } from 'rxjs';
import { UserModel } from '../modals/user';
import { SidebarService } from '../sidebar/sidebar/sidebar.service';
import { MatSidenav } from '@angular/material';
import { Role } from '../modals/role';

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
	@ViewChild('sidenav') public sidenav: MatSidenav;
	constructor(public globals: Globals,
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
		this.roleName(this.user.role);
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
		if(type == Role.Admin) {
			this.role = 'System Admin';
		} else if(type == Role.Requester) {
			this.role = 'Requester';
		} else if(type == Role.Agent) {
			this.role = 'KYC Agent';
		} else if(type == Role.InsAdmin) {
			this.role = 'Institute Admin';
		} else if(type == Role.InsDataMgr) {
			this.role = 'Data Manager';
		} else if(type == Role.AffInsDataMgr) {
			this.role = 'Data Manager';
		} else if(type == Role.InsRev) {
			this.role = 'Reviewer';
		} else if(type == Role.AffInsRev) {
			this.role = 'Reviewer';
		} else if(type == Role.DataCert) {
			this.role = 'Certifier';
		} else if(type == Role.DataApp) {
			this.role = 'Approver';
		} else if(type == Role.Student) {
			this.role = 'Student';
		} 
	}

	openSidebar() {
		this.sidebarService.toggle();
	}

}
