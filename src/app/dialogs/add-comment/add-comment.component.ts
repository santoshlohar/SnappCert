import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-add-comment',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

	addComment: FormGroup;
	comment: "";
	constructor(private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<AddCommentComponent>) { }

	ngOnInit() {
		this.addComment = this.formBuilder.group({
			comment: (['', Validators.required])
		});
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.addComment.controls[controlName].hasError(errorName);		
	}

	add() {

	}

}
