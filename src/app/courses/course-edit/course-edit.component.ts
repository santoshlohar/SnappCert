import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.css']
})	
export class CourseEditComponent implements OnInit {
	
	url;
	id;
	inst_Id;
	loggedInUser;
	course;
	courseData = {
		instituteId: '',
		departmentId: '',
		type: '',
		code: '',
		name: '',
		specialization: '',
		certificateGenerate: '',
		certificatePrint: '',
		gpaCalculated: '',
		subjectCredits: '',
		duration: '',
		durationUnit: '',
		termType: '',
		noOfTerms: ''
	};
	insCourseForm: FormGroup;
	constructor(private formBuilder: FormBuilder,
				private apiService: ApiService,
				private route: ActivatedRoute,
				private router: Router,
				private location: Location) { 
				}

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.getCourse(this.id);
		this.insCourseForm = this.formBuilder.group({
			//departmentId: ['', Validators.required],
			type:  ['', Validators.required],
			code: [{value: '', disabled: true}, Validators.required],
			name: ['', Validators.required],
			specialization: ['', Validators.required],
			certificateGenerate: ['', Validators.required],
			certificatePrint: ['', Validators.required],
			gpaCalculated: ['', Validators.required],
			subjectCredits: ['', Validators.required],
			duration: ['', Validators.required],
			durationUnit: ['', Validators.required],
			termType: ['', Validators.required],
			noOfTerms: ['', Validators.required]
		});
	}

	getCourse(id) {
		this.url = "/course/"+ id;
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					this.course = response.data;
					if(this.course.certificatePrint == true) {
						this.course.certificatePrint = "true";
					} else {
						this.course.certificatePrint = "false";
					}

					if(this.course.gpaCalculated == true) {
						this.course.gpaCalculated = "true";
					} else {
						this.course.gpaCalculated = "false";
					}
					this.insCourseForm.patchValue(this.course);
				}
			})
	}

	editCourse(data: NgForm) {
		this.url = "/course/" + this.id;
		this.courseData.departmentId =  data.value.departmentId;
		this.courseData.type = data.value.type;
		this.courseData.code = data.value.code;
		this.courseData.name = data.value.name;
		this.courseData.specialization = data.value.specialization;
		this.courseData.certificateGenerate = data.value.certificateGenerate;
		this.courseData.certificatePrint = data.value.certificatePrint;
		this.courseData.gpaCalculated = data.value.gpaCalculated;
		this.courseData.subjectCredits = data.value.subjectCredits;
		this.courseData.duration = data.value.duration;
		this.courseData.durationUnit = data.value.durationUnit;
		this.courseData.termType = data.value.termType;
		this.courseData.noOfTerms = data.value.noOfTerms;
		this.courseData.instituteId = this.loggedInUser.reference.instituteId;

		this.apiService.put(this.url, this.courseData)
			.subscribe((response) => {
				if(response.success == true) {
					this.router.navigate(['/courses/']);
				}
			});
	}

	goBack() {
		this.location.back();
	}

}
