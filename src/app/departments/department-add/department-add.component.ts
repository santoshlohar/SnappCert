import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
		instituteID: '',
		department_ID: '',
		department_Name: ''
	};
	url: string;

	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.inst_id = this.loggedInUser.instituteID;
		this.insDeptForm = this._formBuilder.group({
			instituteID: [{value: this.inst_id, disabled: true}, Validators.required],
			department_ID: ['', Validators.required],
			department_Name: ['', Validators.required]
		});
	}

	viewDepartments() {
		this.router.navigate(['/','departments']);
	}

	addDept(deptData: NgForm) {
		if(deptData.invalid) {
			return;
		}
		this.url = '/department';

		this.dept.instituteID = this.inst_id;
		this.dept.department_ID = deptData.value.department_ID;
		this.dept.department_Name = deptData.value.department_Name;
		this.apiService.post(this.url,this.dept)
			.subscribe((response) => {
				this.viewDepartments();
			});
	}

	goBack() {
		this.location.back();
	}

}
