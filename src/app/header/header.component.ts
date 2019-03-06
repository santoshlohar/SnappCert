import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	heading: string;
	courseId;

	@Input() stateRoute: string;
	constructor(public globals: Globals,
				public router: Router,
				private authService: AuthService,
				private authGuard: AuthGuard,
				private route: ActivatedRoute) {
				}

	ngOnInit() {
		// console.log(this.router.url);
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
		} else if(url === '/courses') {
			this.heading = 'Courses';
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

}
