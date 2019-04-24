import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {

	insDeptForm: FormGroup;
	loggedInUser;
	inst_id;
	dept = {
		instituteId: '',
		code: '',
		name: ''
	};
	url: string;

	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location,
				private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.inst_id = this.loggedInUser.instituteId;
		this.insDeptForm = this._formBuilder.group({
			instituteId: [{value: this.inst_id, disabled: true}, Validators.required],
			code: ['', Validators.required],
			name: ['', Validators.required]
		});
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		  	duration: 3000,
		});
	}

	viewDepartments() {
		this.router.navigate(['/','departments']);
	}

	addDept(deptData: NgForm) {
		if(deptData.invalid) {
			return;
		}
		this.url = '/department/create';

		this.dept.instituteId = this.inst_id;
		this.dept.code = deptData.value.code;
		this.dept.name = deptData.value.name;
		this.apiService.post(this.url, this.dept)
			.subscribe((response: any) => {
				console.log(response);
				if(response.success == true) {
					this.openSnackBar('Your department added successfully.', "department" );
					this.viewDepartments();
				}
			});
	}

	goBack() {
		this.location.back();
	}

}
