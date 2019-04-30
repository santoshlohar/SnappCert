import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.css']
})	
export class CourseEditComponent implements OnInit {
	
	url;
	id;
	inst_Id;
	loginUser;
	course;
	courseData = {
		instituteId: '',
		departmentId: '',
		courseType: '',
		code: '',
		courseName: '',
		specialization: '',
		certificateGenerate: '',
		certificatePrint: '',
		gpaCalculated: '',
		subjectCredits: '',
		courseDuration: '',
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
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.inst_Id = this.loginUser.instituteID;
		//this.getCourseById(this.id);
		this.insCourseForm = this.formBuilder.group({
			departmentId: ['', Validators.required],
			courseType:  ['', Validators.required],
			code: ['', Validators.required],
			courseName: ['', Validators.required],
			specialization: ['', Validators.required],
			certificateGenerate: ['', Validators.required],
			certificatePrint: ['', Validators.required],
			gpaCalculated: ['', Validators.required],
			subjectCredits: ['', Validators.required],
			courseDuration: ['', Validators.required],
			durationUnit: ['', Validators.required],
			termType: ['', Validators.required],
			noOfTerms: ['', Validators.required]
		});
	}

	// getCourseById(id) {
	// 	this.url = "/course/";
	// 	console.log(this.url)
	// 	this.apiService.get(this.url+id)
	// 		.subscribe((response) => {
	// 			if(response.message == 'success' && response.data != '') {
	// 				this.course = response.data;
	// 				console.log('course: ' + JSON.stringify(this.course));
	// 				this.insCourseForm.patchValue(this.course);
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log(error)
	// 		})
	// }

	editCourse(data: NgForm) {
		console.log(data);
		this.url = "/course/" + this.id;
		this.courseData.departmentId =  data.value.departmentId;
		this.courseData.courseType = data.value.Course_Type;
		this.courseData.code = data.value.Course_ID;
		this.courseData.courseName = data.value.Course_Name;
		this.courseData.specialization = data.value.specialization;
		this.courseData.certificateGenerate = data.value.Certificate_Generate;
		this.courseData.certificatePrint = data.value.Certificate_Print;
		this.courseData.gpaCalculated = data.value.GPA_Calculated;
		this.courseData.subjectCredits = data.value.Subject_Credits;
		this.courseData.courseDuration = data.value.Course_Duration;
		this.courseData.durationUnit = data.value.Duration_Unit;
		this.courseData.termType = data.value.Term_Type;
		this.courseData.noOfTerms = data.value.No_of_Terms;
		this.courseData.instituteId = this.inst_Id;
		
		// this.apiService.put(this.url+this.id, this.courseData)
		// 	.subscribe((response) => {
		// 		if(response.message == 'success') {
		// 			this.router.navigate(['/courses']);
		// 		} else {
		// 			var errmsg = response.error.msg;
		// 			alert(errmsg);
		// 		}
		// 	},
		// 	(error) => {
		// 		console.log(error);
		// 	});
	}

	goBack() {
		this.location.back();
	}

}
