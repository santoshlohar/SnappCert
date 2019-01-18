import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ins-dept',
  templateUrl: './add-ins-dept.component.html',
  styleUrls: ['./add-ins-dept.component.css']
})
export class AddInsDeptComponent implements OnInit {

	insDeptForm: FormGroup;
	loggedInUser;
	dept = {
		Institution_ID: '',
		department_ID: '',
		department_Name: ''
	};
	url: string;

	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.insDeptForm = this._formBuilder.group({
			Institution_ID: ['', Validators.required],
			department_ID: ['', Validators.required],
			department_Name: ['', Validators.required]
		});
		this.insDeptForm.controls.Institution_ID.setValue(this.loggedInUser.Institution_ID);
	}

	viewDepartments() {
		this.router.navigate(['/','viewInstituteDepartments']);
	}

	addDept(deptData: NgForm) {
		console.log(deptData);

		if(deptData.invalid) {
			return;
		}
		this.url = '/department';

		this.dept.Institution_ID = deptData.value.Institution_ID;
		this.dept.department_ID = deptData.value.department_ID;
		this.dept.department_Name = deptData.value.department_Name;

		this.apiService.post(this.url,this.dept)
			.subscribe((response) => {
				this.viewDepartments();
			});
	}

}
