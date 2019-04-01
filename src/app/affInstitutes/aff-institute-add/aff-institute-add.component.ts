import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aff-institute-add',
  templateUrl: './aff-institute-add.component.html',
  styleUrls: ['./aff-institute-add.component.css']
})
export class AffInstituteAddComponent implements OnInit {

	affInst: any = {
		Institution_ID: '',
		department_ID: '',
		AfflInstitution_ID: '',
		afflInstitute_Name: '',
		afflInstitute_loc: ''
	};
	url;
	departments = [];
	loginUser;
	inst_id;
	affliatedInsForm: FormGroup;
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location) { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.inst_id = this.loginUser.instituteID;
		this.affliatedInsForm = this._formBuilder.group({
			instituteId: ['', Validators.required],
			departmentId: ['', Validators.required],
			affInstituteId: ['', Validators.required],
			affInstituteName: ['', Validators.required],
			affInstituteLoc: ['', Validators.required]
		});
		this.getDeptList();
		this.affliatedInsForm.controls.instituteId.setValue(this.loginUser.Institution_ID);
	}

	getDeptList() {
		this.url = "/departmentByInst/";
		var params = '';
		this.apiService.get(this.url+ this.inst_id, params)
			.subscribe((response) => {
				if(response.message == 'success') {
					if(response.data) {
						this.departments = response.data; 
					}
				}
			},
			(error) => {
				console.log(error)
			})
	}

	addAffInst(affInstData: NgForm) {
		if(affInstData.invalid) {
			return;
		} 
		this.url = '/afflInstitute';

		this.affInst.Institution_ID = affInstData.value.instituteId;
		this.affInst.department_ID = affInstData.value.departmentId;
		this.affInst.AfflInstitution_ID = affInstData.value.affInstituteId;
		this.affInst.afflInstitute_Name = affInstData.value.affInstituteName;
		this.affInst.afflInstitute_loc = affInstData.value.affInstituteLoc;

		// this.viewAffInstitutes();
		this.apiService.post(this.url, this.affInst)
			.subscribe((response) => {
				console.log(response);
				this.viewAffInstitutes();
			});
	}

	viewAffInstitutes() {
		console.log("View Aff Inst");
		this.router.navigate(['/affInstitutes']);
	}

	goBack() {
		this.location.back();
	}

}
