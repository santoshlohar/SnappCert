import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
	
	url;
	id;
	course;
	insCourseForm: FormGroup;
	constructor(private formBuilder: FormBuilder,
				private apiService: ApiService,
				private route: ActivatedRoute) { 
				}

	ngOnInit() {
		this.id = this.route.snapshot.params['courseId'];
		this.getCourseById(this.id);
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
		});
	}

	getCourseById(id) {
		this.url = "/course/";
		this.apiService.get(this.url+id)
			.subscribe((response) => {
				if(response.message == 'success' && response.data != '') {
					this.course = response.data;
					console.log(this.course)
				}
			},
			(error) => {
				console.log(error)
			})
	}

}
