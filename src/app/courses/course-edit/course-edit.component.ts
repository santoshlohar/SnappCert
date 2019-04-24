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
		department_ID: '',
		Course_Type: '',
		Course_ID: '',
		Course_Name: '',
		Specialization: '',
		Certificate_Generate: '',
		Certificate_Print: '',
		GPA_Calculated: '',
		Subject_Credits: '',
		Course_Duration: '',
		Duration_Unit: '',
		Term_Type: '',
		No_of_Terms: '',
		instituteID: ''
	};
	insCourseForm: FormGroup;
	constructor(private formBuilder: FormBuilder,
				private apiService: ApiService,
				private route: ActivatedRoute,
				private router: Router,
				private location: Location) { 
				}

	ngOnInit() {
		this.id = this.route.snapshot.params['courseId'];
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.inst_Id = this.loginUser.instituteID;
		this.getCourseById(this.id);
		this.insCourseForm = this.formBuilder.group({
			department_ID: ['', Validators.required],
			Course_Type:  ['', Validators.required],
			Course_ID: ['', Validators.required],
			Course_Name: ['', Validators.required],
			Specialization: ['', Validators.required],
			Certificate_Generate: ['', Validators.required],
			Certificate_Print: ['', Validators.required],
			GPA_Calculated: ['', Validators.required],
			Subject_Credits: ['', Validators.required],
			Course_Duration: ['', Validators.required],
			Duration_Unit: ['', Validators.required],
			Term_Type: ['', Validators.required],
			No_of_Terms: ['', Validators.required]
		});
	}

	getCourseById(id) {
		this.url = "/course/";
		console.log(this.url)
		this.apiService.get(this.url+id)
			.subscribe((response) => {
				if(response.message == 'success' && response.data != '') {
					this.course = response.data;
					console.log('course: ' + JSON.stringify(this.course));
					this.insCourseForm.patchValue(this.course);
				}
			},
			(error) => {
				console.log(error)
			})
	}

	editCourse(data: NgForm) {
		console.log(data);
		this.url = "/course/";
		this.courseData.department_ID =  data.value.department_ID;
		this.courseData.Course_Type = data.value.Course_Type;
		this.courseData.Course_ID = data.value.Course_ID;
		this.courseData.Course_Name = data.value.Course_Name;
		this.courseData.Specialization = data.value.Specialization;
		this.courseData.Certificate_Generate = data.value.Certificate_Generate;
		this.courseData.Certificate_Print = data.value.Certificate_Print;
		this.courseData.GPA_Calculated = data.value.GPA_Calculated;
		this.courseData.Subject_Credits = data.value.Subject_Credits;
		this.courseData.Course_Duration = data.value.Course_Duration;
		this.courseData.Duration_Unit = data.value.Duration_Unit;
		this.courseData.Term_Type = data.value.Term_Type;
		this.courseData.No_of_Terms = data.value.No_of_Terms;
		this.courseData.instituteID = this.inst_Id;
		
		this.apiService.put(this.url+this.id, this.courseData)
			.subscribe((response) => {
				if(response.message == 'success') {
					this.router.navigate(['/courses']);
				} else {
					var errmsg = response.error.msg;
					alert(errmsg);
				}
			},
			(error) => {
				console.log(error);
			});
	}

	goBack() {
		this.location.back();
	}

}
