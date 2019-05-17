import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-batch-list',
	templateUrl: './batch-list.component.html',
	styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	url;
	batch;
	batches = [];
	selectedBatches;
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);
	displayedColumns = [
		'select',
		'instituteId',
		'affiliateId',
		'courseId',
		'code',
		'year',
		'start',
		'end',
		'minCredits',
		'minCgpa',
		'totalCgpa',
		'minScore',
		'totalScore'
	];

	instituteIdFilter = new FormControl();
	affiliateIdFilter = new FormControl();
	courseIdFilter = new FormControl();
	batchIdFilter = new FormControl();
	batchYearFilter = new FormControl();
	startFilter = new FormControl();
	endFilter = new FormControl();
	minCreditFilter = new FormControl();
	minCgpaFilter = new FormControl();
	totalCgpaFilter = new FormControl();
	minScoreFilter = new FormControl();
	totalScoreFilter = new FormControl();

	filteredValues = {
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
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				private router: Router,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getBatches();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ? 
			this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	}

	getBatches() {
		this.url = "/batch/list";

		var params = new HttpParams();

		params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);
		// params = params.append('skip', this.loggedInUser.reference.affiliateId);
		// params = params.append('limit', this.loggedInUser.reference.affiliateId);
		

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.batches = response.data.batches;
					console.log(this.batches);
					this.dataSource.data = this.batches;
				}
			})
	}

	edit() {
		this.selectedBatches = this.selection.selected;

		if(this.selectedBatches.length !== 1) {
			var data = {
				reason: "Please select one batch to edit!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.batch = this.selectedBatches[0];
			this.router.navigate(['/batchEdit/'+ this.batch._id]);
		}
	}
	
}
