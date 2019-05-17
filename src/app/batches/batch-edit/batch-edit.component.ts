import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-batch-edit',
	templateUrl: './batch-edit.component.html',
	styleUrls: ['./batch-edit.component.css']
})
export class BatchEditComponent implements OnInit {

	loggedInUser;
	url;
	id;
	courses:[] = [];
	batch;
	batchEditForm: FormGroup;
	batchData = {
		instituteId: '',
		affiliateId: '',
		courseId: '',
		code: '',
		year: '',
		start: '',
		end: '',
		minCredits: '',
		minCgpa: '',
		totalCgpa: '',
		minScore: '',
		totalScore: ''
	}

	constructor(private _formBuilder: FormBuilder,
		private apiService: ApiService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.id = this.route.snapshot.params['id'];
		this.batchEditForm = this._formBuilder.group({
			courseId: [{value: '', disabled: true}, Validators.required],
			code: ['', Validators.required],
			year: ['', Validators.required],
			start: ['', Validators.required],
			end: ['', Validators.required],
			minCredits: [''],
			minCgpa: [''],
			totalCgpa: [''],
			minScore: ['', Validators.required],
			totalScore: ['', Validators.required]	
		});
		this.myCourses();
		this.getBatch(this.id);
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.batchEditForm.controls[controlName].hasError(errorName);		
	}

	myCourses() {
		this.url = "/course/affiliateCourses";

		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					this.courses = response.data;

				}
			})
	}

	getBatch(id) {

		this.url = "/batch/" + id;
		var params = '';

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.batch = response.data;
					this.batchEditForm.patchValue(this.batch);
				}
			})

	}

	editBatch(batchData: NgForm) {
		this.url = "/batch/" + this.id;
		
		this.batchData.instituteId = this.loggedInUser.reference.instituteId;
		this.batchData.affiliateId = this.loggedInUser.reference.affiliateId;
		this.batchData.courseId = this.batch.courseId;
		this.batchData.code = batchData.value.code;
		this.batchData.year = batchData.value.year;
		this.batchData.start = batchData.value.start;
		this.batchData.end = batchData.value.end;
		this.batchData.minCredits = batchData.value.minCredits;
		this.batchData.minCgpa = batchData.value.minCgpa;
		this.batchData.totalCgpa = batchData.value.totalCgpa;
		this.batchData.minScore = batchData.value.minScore;
		this.batchData.totalScore = batchData.value.totalScore;

		this.apiService.put(this.url, this.batchData)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.router.navigate(['/batches']);
				}
			})
	}	

}
