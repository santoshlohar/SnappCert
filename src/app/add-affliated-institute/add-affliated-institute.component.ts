import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-affliated-institute',
  templateUrl: './add-affliated-institute.component.html',
  styleUrls: ['./add-affliated-institute.component.css']
})

export class AddAffliatedInstituteComponent implements OnInit {
	affInst: any = {
		Institution_ID: '',
		department_ID: '',
		AfflInstitution_ID: '',
		afflInstitute_Name: '',
		afflInstitute_loc: ''
	};
	url;
	loggedInUser;
	affliatedInsForm: FormGroup;
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.affliatedInsForm = this._formBuilder.group({
			instituteId: ['', Validators.required],
			departmentId: ['', Validators.required],
			affInstituteId: ['', Validators.required],
			affInstituteName: ['', Validators.required],
			affInstituteLoc: ['', Validators.required]
		});
		this.affliatedInsForm.controls.instituteId.setValue(this.loggedInUser.Institution_ID);
	}

	addAffInst(affInstData: NgForm) {
		console.log(affInstData);
		if(affInstData.invalid) {
			return;
		} 
		this.url = '/afflInstitute';

		this.affInst.Institution_ID = affInstData.value.instituteId;
		this.affInst.department_ID = affInstData.value.departmentId;
		this.affInst.AfflInstitution_ID = affInstData.value.affInstituteId;
		this.affInst.afflInstitute_Name = affInstData.value.affInstituteName;
		this.affInst.afflInstitute_loc = affInstData.value.affInstituteLoc;

		console.log(this.affInst);
		this.viewAffInstitutes();
		this.apiService.post(this.url, this.affInst)
			.subscribe((response) => {
				console.log(response);
				this.viewAffInstitutes();
			});
	}

	viewAffInstitutes() {
		console.log("View Aff Inst");
		this.router.navigate(['/affliatedInstitutes']);
	}

}
