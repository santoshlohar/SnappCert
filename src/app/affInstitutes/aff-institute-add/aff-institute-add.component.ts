import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-aff-institute-add',
  templateUrl: './aff-institute-add.component.html',
  styleUrls: ['./aff-institute-add.component.css']
})
export class AffInstituteAddComponent implements OnInit {

	affInst = {
		instituteId: '',
		departmentId: '',
		code: '',
		name: '',
		address: ''
	};
	url;
	departments = [];
	loggedInUser;
	affliatedInsForm: FormGroup;
	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		console.log(this.loggedInUser)
		this.affliatedInsForm = this._formBuilder.group({
			departmentId: ['', Validators.required],
			affInstituteId: [''],
			affInstituteName: ['', Validators.required],
			affInstituteLoc: ['', Validators.required]
		});
		this.getDeptList();
		//this.affliatedInsForm.controls.instituteId.setValue(this.loggedInUser.instituteId);
	}

	getDeptList() {
		this.url = "/department/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.instituteId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					if(response.data) {
						this.departments = response.data; 
					}
				}
			})
	}

	addAffInst(affInstData: NgForm) {
		if(affInstData.invalid) {
			return;
		} 
		this.url = '/affiliate/create';
		
		this.affInst.instituteId = this.loggedInUser.instituteId;
		this.affInst.departmentId = affInstData.value.departmentId;
		this.affInst.code = affInstData.value.affInstituteId;
		this.affInst.name = affInstData.value.affInstituteName;
		this.affInst.address = affInstData.value.affInstituteLoc;

		this.apiService.post(this.url, this.affInst)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.viewAffInstitutes();
				}
			});
	}

	viewAffInstitutes() {
		this.router.navigate(['/affInstitutes']);
	}

	goBack() {
		this.location.back();
	}

}
