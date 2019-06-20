import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { StudentDataService } from 'src/app/students/student-data.service';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

	addComment: FormGroup;
	comment: "";
	url;
	constructor(private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<AddCommentComponent>,
		public apiService: ApiService,
		// public studentDataService: StudentDataService
		) { }

	ngOnInit() {
		this.addComment = this.formBuilder.group({
			comment: (['', Validators.required])
		});
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.addComment.controls[controlName].hasError(errorName);		
	}

	add() {
		var dialogData = this.dialogRef._containerInstance._config.data;
		var studentId = dialogData.url.split('/')[2];
		this.url = "/student/"+ studentId + "/comment"; 

		var obj = {
			status: dialogData.status
		};

		var comment = {
			text: this.comment
		};

		this.apiService.post(this.url, comment)
			.subscribe((response: any) => {
				console.log(response);
				if(response.success == true) {
					this.dialogRef.close();
				}
			});
	}

	close() {
		this.dialogRef.close();
	}

}
