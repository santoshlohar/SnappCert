import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-add-grade-structure',
	templateUrl: './add-grade-structure.component.html',
	styleUrls: ['./add-grade-structure.component.css']
})
export class AddGradeStructureComponent implements OnInit {

	affInsGradeForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.affInsGradeForm = this._formBuilder.group({
            instituteId: ['', Validators.required],
            affInstitute: ['', Validators.required],
            courseId: ['', Validators.required],
            marksRange: ['', Validators.required],
            grade: ['', Validators.required],
            courseName: ['', Validators.required],
            gradePoint: ['', Validators.required]		
        });
    }

}
