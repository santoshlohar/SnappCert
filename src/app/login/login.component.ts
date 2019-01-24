import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<LoginComponent>,
				@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	login(form: NgForm) {
		console.log(form);
	}

}
