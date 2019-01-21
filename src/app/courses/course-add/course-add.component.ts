import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

	affInsCourseForm: FormGroup;
    url;
    courseDetails = {
        Institution_ID: '',
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
        No_of_Terms: ''
    };
    constructor(private _formBuilder: FormBuilder,
                private apiService: ApiService,
				private router: Router) { }
				
	ngOnInit() {
		this.affInsCourseForm = this._formBuilder.group({
            Institution_ID: ['', Validators.required],
            department_ID: ['', Validators.required],
            Course_Type: ['', Validators.required],
            Course_ID: ['', Validators.required],
            Course_Name: ['', Validators.required],
            Specialization: '',    
            Certificate_Generate: '',     
            Certificate_Print: ['', Validators.required],      
			GPA_Calculated: ['', Validators.required], 
			Subject_Credits: ['', Validators.required],     
            Course_Duration: ['', Validators.required], 
            Duration_Unit: ['', Validators.required],     
            Term_Type: '',      
            No_of_Terms: ''    			
        });
	}

	addCourse(courseData: NgForm) {
        console.log(courseData);

        if(courseData.invalid) {
            return false;
        }
        this.url = '/coursedata'
        this.courseDetails = courseData.value
        this.apiService.post(this.url, this.courseDetails)
        .subscribe((response) => {
            console.log(response);
            this.router.navigate(['/courses']);
        });
    }

}
