import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../modals/user';
import { AddCommentService } from '../dialogs/add-comment/add-comment.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class StudentDataService {

	user;
	id;
	constructor(public http: HttpClient,
				private authService: AuthService,
				public apiService: ApiService,
				public addCommentService: AddCommentService,
				public route: ActivatedRoute,
				public router: Router
				) {
					this.authService.currentUser
						.subscribe((user) => {
							this.user = user;
						});


					this.id = this.route.snapshot.params['batchId'];
					console.log(this.id);
				}

	changeStatus(dialogData, data) {

		var getStudenturl = "/student/list";
		var params = new HttpParams();
		var students = [];
		params = params.append('skip', '0');
		params = params.append('limit', '10');
		params = params.append('instituteId', this.user.reference.instituteId);

		if(this.user.reference.affiliateId === '111111111111111111111111') {
			params = params.append('affiliateId', this.id);
		} else {
			params = params.append('affiliateId', this.user.reference.affiliateId);
			params = params.append('batchId', this.id);
		}
		console.log(dialogData);
		this.apiService.put(dialogData.url, data)
			.subscribe((response: any) => {
				if(response.success == true) {
					var student = response.data.student;
					var reviewers = student.reviewers;
					var userId = this.user._id;
					for (var key in reviewers) {
						if(reviewers[key].userId === userId) {
							var currentReviewerStatus = reviewers[key].status;
							if(currentReviewerStatus == 'rejected') {
								this.addCommentService.openDialog(dialogData);
							}
						}
					};
					this.getStudents(getStudenturl, params)
						.subscribe((response: any) => {
							console.log(response);
							if(response.success == true) {
								if(response.data.students.length) {
									students = response.data.students;
									this.dataSource.data = response.data.students;
								}
							}
						});
				}
			}) 
	};

	getStudents(url, params) {
		return this.apiService.get(url, params);
	}
}
