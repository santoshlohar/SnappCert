import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch-add',
  templateUrl: './batch-add.component.html',
  styleUrls: ['./batch-add.component.css']
})
export class BatchAddComponent implements OnInit {


	url;
	loggedInUser;
	affBatchForm: FormGroup;

	courses:[] = [];
	batch= {
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
		totalScore: '',

	};

	constructor(private _formBuilder: FormBuilder,
				private apiService: ApiService,
				private router: Router,
				private location: Location) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.affBatchForm = this._formBuilder.group({
			courseId: ['', Validators.required],
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
	}

	public hasError = (controlName: string, errorName: string) =>{		
		return  this.affBatchForm.controls[controlName].hasError(errorName);		
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

	addBatch(batchData: NgForm) {
		if(batchData.invalid) {
			return false;
		}

		this.url = "/batch/create";

		this.batch.instituteId = this.loggedInUser.reference.instituteId;
		this.batch.affiliateId = this.loggedInUser.reference.affiliateId;
		this.batch.courseId = batchData.value.courseId;
		this.batch.code = batchData.value.code;
		this.batch.year = batchData.value.year;
		this.batch.start = batchData.value.start;
		this.batch.end = batchData.value.end;
		this.batch.minCredits = batchData.value.minCredits;
		this.batch.minCgpa = batchData.value.minCgpa;
		this.batch.totalCgpa = batchData.value.totalCgpa;
		this.batch.minScore = batchData.value.minScore;
		this.batch.totalScore = batchData.value.totalScore;
		console.log(this.batch);
		this.apiService.post(this.url, this.batch) 
			.subscribe((response: any) => {
				if(response.success == true) {
					this.router.navigate(['/batches']);
				}
			})

	}

	goBack() {
		this.location.back();
	}

}
