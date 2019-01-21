import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs';
import { Observable, ObservableInput } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from '../services/api.service';

@Component({
	selector: 'app-institute-registration',
	templateUrl: './institute-registration.component.html',
	styleUrls: ['./institute-registration.component.css']
})
export class InstituteRegistrationComponent implements OnInit {

	insRegForm;
	instRequestForm: FormGroup;

	constructor(private _formBuilder: FormBuilder, 
		private apiService: ApiService) { }

	ngOnInit() {
		this.instRequestForm = this._formBuilder.group({
			
		});
	}

	public hasError = (controlName: string, errorName: string) =>{
        return this.instRequestForm.controls[controlName].hasError(errorName);
    }

	registerInstitute(regForm: NgForm) {
		if (regForm.invalid) {
			return;
		}
	}
	

}
