import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-add-aff-ins-auth-user',
	templateUrl: './add-aff-ins-auth-user.component.html',
	styleUrls: ['./add-aff-ins-auth-user.component.css']
})
export class AddAffInsAuthUserComponent implements OnInit {

	affInsAuthUsrForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.affInsAuthUsrForm = this._formBuilder.group({
            instituteId: ['', Validators.required],
            departmentId: ['', Validators.required],
            reviewer: ['', Validators.required],
            authorityTitle: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],      
        });
    }

}
