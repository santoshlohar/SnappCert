import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ins-department',
  templateUrl: './edit-ins-department.component.html',
  styleUrls: ['./edit-ins-department.component.css']
})
export class EditInsDepartmentComponent implements OnInit {

	insEditDeptForm: FormGroup;
  
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router) { }

	ngOnInit() {
		this.insEditDeptForm =  this._formBuilder.group({
			Institution_ID: ['', Validators.required],
			department_ID: ['', Validators.required],
			department_Name: ['', Validators.required] 
		})
	}

	

}
