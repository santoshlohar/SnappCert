import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-aff-institute',
  templateUrl: './edit-aff-institute.component.html',
  styleUrls: ['./edit-aff-institute.component.css']
})
export class EditAffInstituteComponent implements OnInit {

	affInstForm: FormGroup;
	affInsId;
	updatedAffIns = {
		Institution_ID: '',
		department_ID: '',
		AfflInstitution_ID: '',
		afflInstitute_Name: '',
		afflInstitute_loc: '',
		status: ''
	};

	constructor(private _formBuilder: FormBuilder,
				private router: Router,
				private route: ActivatedRoute,
				private apiService: ApiService) { }

	ngOnInit() {
		this.affInstForm = this._formBuilder.group({
			Institution_ID: [{value: ''}, Validators.required],
			department_ID: [{value: ''}, Validators.required],
			AfflInstitution_ID: [{value: ''}, Validators.required],
			afflInstitute_Name: [{value: ''}, Validators.required],
			afflInstitute_loc: [{value: ''}, Validators.required],
			status: [{value: ''}, Validators.required]
		});
		this.affInsId = this.route.snapshot.paramMap.get("affInsId");
	}

	getAffInsDetails() {

		console.log("Get Aff Ins")
	}

	updateAffInst() {

	}

}
