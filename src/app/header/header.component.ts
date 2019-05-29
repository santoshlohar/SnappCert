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
		this.roleName(this.user.reference.role);
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
		var startId = url.split('/')[1];
		var endId = url.split('/')[2];
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
		} else if(startId && (url == '/'+ startId +'/batches')) {
			this.heading = 'Batches';
		} else if(url === '/batchAdd') {
			this.heading = 'Add Batch';
		} else if(endId && (url == '/courseEdit/'+endId)) {
			this.heading = 'Course Edit';
		} else if(endId && (url == '/certificateView/'+endId)) {
			this.heading = 'Certificate Data';
		} else if(startId && (url == '/'+ startId +'/uploadedStudents')) {
			this.heading = 'Uploaded Students';
		} else if(startId && (url == '/'+ startId +'/students')) {
			this.heading = 'Students';
		} else if(startId && (url == '/'+ startId +'/uploadedCertificates')) {
			this.heading = 'Certificates';
		} else if(startId && (url == '/'+ startId +'/certificates')) {
			this.heading = 'Certificates';
		}
	}

	roleName(role) {

		if(role == 'admin') {
			this.role = 'Institute Admin';
		} else if(role == 'manager') {
			this.role = 'Manager';
		} else if(role == 'reviewer') {
			this.role = 'Reviewer';
		} else if(role == 'certifier') {
			this.role = 'Certifier';
		} else if(role == 'approver') {
			this.role = 'Approver';
		}
	}

	openSidebar() {
		this.sidebarService.toggle();
	}

}
