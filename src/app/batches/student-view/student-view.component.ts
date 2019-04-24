import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-student-view',
	templateUrl: './student-view.component.html',
	styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

	url;
	loginUser;
	userType;
	studentId;
	student = {};
	constructor(private apiService: ApiService,
				private route: ActivatedRoute,
				private location: Location) {
		this.studentId = this.route.snapshot.params['studentId'];
	}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.getStudentData();
	}

	getStudentData() {
		this.url = "/student/";
		this.apiService.get(this.url + this.studentId)
			.subscribe((response) => {
				console.log(response)
				if(response.message == 'success') {
					if(response.data) {
						this.student = response.data;
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	goBack() {
		this.location.back();
	}

}
