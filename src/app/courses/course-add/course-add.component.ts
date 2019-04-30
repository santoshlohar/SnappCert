import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

	affInsCourseForm: FormGroup;
    url;
    loggedInUser;
    courseDetails = {
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
            courseType: ['', Validators.required],
            code: ['', Validators.required],
            courseName: ['', Validators.required],
            specialization: '',    
            certificateGenerate: '',     
            certificatePrint: ['', Validators.required],      
			gpaCalculated: ['', Validators.required], 
			subjectCredits: ['', Validators.required],     
            courseDuration: ['', Validators.required], 
            durationUnit: ['', Validators.required],     
            termType: '',      
            noOfTerms: ''    			
        });
	}

	addCourse(courseData: NgForm) {
        console.log(courseData)
        if(courseData.invalid) {
            return false;
        }
        this.url = '/course/create'
        this.courseDetails = courseData.value;
        this.courseDetails.instituteId = this.loggedInUser.instituteId;
        this.courseDetails.departmentId = this.loggedInUser.departmentId;
        console.log(this.courseDetails)
        // this.apiService.post(this.url, this.courseDetails)
        //     .subscribe((response) => {
        //         console.log(response);
        //         this.router.navigate(['/courses']);
        //     });
    }

    goBack() {
        this.location.back();
    }

}
