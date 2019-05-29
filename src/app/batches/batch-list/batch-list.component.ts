import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';

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
	affiliateId;
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
		'totalScore',
		'status', 
		'id'
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
	batchStatusFilter = new FormControl();

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
		totalScore: '',
		status: ''
	}
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				private route: ActivatedRoute,
				private router: Router,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.affiliateId = this.route.snapshot.params['affiliateId'];
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
		params = params.append('affiliateId', this.affiliateId);
		// params = params.append('skip', this.loggedInUser.reference.affiliateId);
		// params = params.append('limit', this.loggedInUser.reference.affiliateId);
		

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.batches = response.data.batches;
					for(var i=0;i<this.batches.length;i++) {
						if(this.batches[i].isDeleted == false) {
							this.batches[i].status = "Active";
						} else {
							this.batches[i].status = "Inactive";
						}
					}
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

	changeStatus(row) {
		var batchId = row._id;
		this.url = "/batch/"+ batchId +"/changeStatus";
		var data = {
			isDeleted: row.isDeleted
		};

		if(row.isDeleted == false) {
			data.isDeleted = true;
		} else {
			data.isDeleted = false;
		}

		this.apiService.put(this.url, data)
			.subscribe((response) => {
				if(response.success == true) {
					this.getBatches();
				}
			});
	}

	uploadStudents() {
		this.selectedBatches = this.selection.selected;

		if(this.selectedBatches.length !== 1) {
			var data = {
				reason: "Please select one batch!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.batch = this.selectedBatches[0];
			this.router.navigate(['/'+ this.batch._id + '/uploadedStudents']);
		}
	}

	students() {
		this.selectedBatches = this.selection.selected;

		if(this.selectedBatches.length !== 1) {
			var data = {
				reason: "Please select one batch!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.batch = this.selectedBatches[0];
			this.router.navigate(['/'+ this.batch._id + '/students']);
		}
	}

	uploadCertificates() {
		this.selectedBatches = this.selection.selected;

		if(this.selectedBatches.length !== 1) {
			var data = {
				reason: "Please select one batch!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.batch = this.selectedBatches[0];
			this.router.navigate(['/'+ this.batch._id + '/uploadedCertificates']);
		}
	}

	certificates() {
		this.selectedBatches = this.selection.selected;

		if(this.selectedBatches.length !== 1) {
			var data = {
				reason: "Please select one batch!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.batch = this.selectedBatches[0];
			this.router.navigate(['/'+ this.batch._id + '/certificates']);
		}
	}
	
}
