import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
	
	insCourseForm: FormGroup;
	constructor(private formBuilder: FormBuilder,
				private apiService: ApiService) { }

	ngOnInit() {
		this.insCourseForm = this.formBuilder.group({
			department_ID: ['', Validators.required],
			course_Type:  ['', Validators.required],
			course_ID: ['', Validators.required],
			course_Name: ['', Validators.required],
			specialization: ['', Validators.required],
			certificate_Generate: ['', Validators.required],
			certificate_Print: ['', Validators.required],
			gpa_Calculated: ['', Validators.required],
			subject_Credits: ['', Validators.required],
			course_Duration: ['', Validators.required],
			duration_Unit: ['', Validators.required],
			term_Type: ['', Validators.required],
			no_of_Terms: ['', Validators.required],
		})
	}

}
