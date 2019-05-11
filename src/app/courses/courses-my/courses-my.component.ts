import { Component, OnInit } from '@angular/core';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-courses-my',
	templateUrl: './courses-my.component.html',
	styleUrls: ['./courses-my.component.css']
})
export class CoursesMyComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	affiliateId;
	url;

	constructor(private apiService: ApiService,
		private router: Router,
		public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.affiliateId = this.loggedInUser.reference.affiliateId;
		this.myCourses();
	}

	myCourses() {
		this.url = "/course/affiliateCourses";
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				console.log(response);
			})
	}

}
