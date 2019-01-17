import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-ins-department',
  templateUrl: './edit-ins-department.component.html',
  styleUrls: ['./edit-ins-department.component.css']
})
export class EditInsDepartmentComponent implements OnInit {

	insEditDeptForm: FormGroup;
	deptID;
	apiUrl;
	updatedDept = {
		_id: '',
		Institution_ID: '',
		department_ID: '',
		department_Name: ''
	}; 
  
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		this.insEditDeptForm =  this._formBuilder.group({
			Institution_ID: [{value: ''}, Validators.required],
			department_ID: [{value: ''}, Validators.required],
			department_Name: [{value: ''}, Validators.required] 
		});
		this.deptID = this.route.snapshot.paramMap.get("deptId")
		this.getDeptDetails();
	}

	getDeptDetails() {
		console.log(this.deptID)
		this.apiUrl = '/departments/';
		this.apiService.get(this.apiUrl+this.deptID)
			.pipe(
				tap((department: object) => {
					console.log(department[0]);
						this.insEditDeptForm.patchValue(department[0])
					})
			)
			.subscribe((response) => {
				console.log(response[0]);
			});

	}

	updateDept(deptData: NgForm) {
		this.apiUrl = '/departments/';
		
		this.updatedDept._id = this.deptID;
		this.updatedDept.Institution_ID = deptData.value.Institution_ID;
		this.updatedDept.department_ID = deptData.value.department_ID;
		this.updatedDept.department_Name = deptData.value.department_Name;

		this.apiService.put(this.apiUrl+this.deptID, this.updatedDept)
			.subscribe((response) => {
				console.log(response);
				this.router.navigate(['/viewInstituteDepartments']);
			});
	}

}
