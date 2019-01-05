import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-ins-auth-user',
    templateUrl: './add-ins-auth-user.component.html',
    styleUrls: ['./add-ins-auth-user.component.css']
})
export class AddInsAuthUserComponent implements OnInit {

    insAuthUsrForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.insAuthUsrForm = this._formBuilder.group({
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
