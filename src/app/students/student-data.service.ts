import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../modals/user';
import { AddCommentService } from '../dialogs/add-comment/add-comment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StudentDataService {

	user: UserModel;
	constructor(public http: HttpClient,
				private authService: AuthService,
				public apiService: ApiService,
				public addCommentService: AddCommentService
				) {
					this.authService.currentUser
						.subscribe((user) => {
							this.user = user;
						});
				}

	changeStatus(dialogData, data) {

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
					 }
				}
			})
	};
}
