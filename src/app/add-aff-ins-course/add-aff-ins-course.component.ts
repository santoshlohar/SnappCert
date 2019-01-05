import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-add-aff-ins-course',
	templateUrl: './add-aff-ins-course.component.html',
	styleUrls: ['./add-aff-ins-course.component.css']
})
export class AddAffInsCourseComponent implements OnInit {

	affInsCourseForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.affInsCourseForm = this._formBuilder.group({
            instituteId: ['', Validators.required],
            affInstitute: ['', Validators.required],
            departmentId: ['', Validators.required],
            courseType: ['', Validators.required],
            courseId: ['', Validators.required],
            courseName: ['', Validators.required],
			certificate: '',
            specialization: '',    
            certificatePrint: ['', Validators.required],     
            gpaCalculated: ['', Validators.required],      
			subCredits: ['', Validators.required], 
			courseDuration: ['', Validators.required],     
            durationUnit: ['', Validators.required],      
            termType: '',      
            noOfTerms: ''    			
        });
    }

}
