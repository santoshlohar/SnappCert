import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

	affInsCourseForm: FormGroup;
    url;
    loggedInUser;
    departments = [];
    courseDetails = {
        instituteId: '',
        departmentId: '',
        code: '',
        type: '',
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
    course = {

    };

    constructor(private _formBuilder: FormBuilder,
                private apiService: ApiService,
                private router: Router,
                private location: Location) { }
				
	ngOnInit() {
        this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.affInsCourseForm = this._formBuilder.group({
            // instituteId: ['', Validators.required],
            // departmentId: ['', Validators.required],
            code: ['', Validators.required],
            type: ['', Validators.required],
            name: ['', Validators.required],
            specialization: '',    
            certificateGenerate: '',     
            certificatePrint: ['', Validators.required],      
			gpaCalculated: ['', Validators.required], 
			subjectCredits: ['', Validators.required],     
            duration: ['', Validators.required], 
            durationUnit: ['', Validators.required],     
            termType: '',      
            noOfTerms: ''    			
        });
    }
    
	addCourse(courseData: NgForm) {
        if(courseData.invalid) {
            return false;
        }
        this.url = '/course/create'
        this.courseDetails = courseData.value;
        this.courseDetails.instituteId = this.loggedInUser.reference.instituteId;
        this.courseDetails.departmentId = this.loggedInUser.reference.departmentId;
        this.apiService.post(this.url, this.courseDetails)
            .subscribe((response: any) => {
                if(response.success == true) {
                    this.router.navigate(['/courses']);
                }
            });
    }

    goBack() {
        this.location.back();
    }

}
