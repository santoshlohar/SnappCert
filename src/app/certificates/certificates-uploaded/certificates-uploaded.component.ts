import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-certificates-uploaded',
	templateUrl: './certificates-uploaded.component.html',
	styleUrls: ['./certificates-uploaded.component.css']
})
export class CertificatesUploadedComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	url;
	batchId;
	displayedColumns = [
		'select',
		'actions',
		'instituteId', 
		'affiliateId', 
		'courseId', 
		'batchId',
		'studentId',
		'certificateId',
		'specialization',
		'scoreEarned',
		'totalScore',
		'cgpa',
		'creditsEarned',
		'completionDate',
		'status'
	];

	instituteIdFilter = new FormControl();
	affiliatedIdFilter = new FormControl();
	courseIdFilter = new FormControl();
	batchIdFilter = new FormControl();
	studentIdFilter = new FormControl();
	certificateIdFilter = new FormControl();
	specializationFilter = new FormControl();
	scoreEarnedFilter = new FormControl();
	totalScoreFilter = new FormControl();
	cgpaFilter = new FormControl();
	creditsEarnedFilter = new FormControl();
	completionDateFilter = new FormControl();
	statusFilter = new FormControl();

	filteredValues = {
		instituteId: '',
		affiliateId: '',
		courseId: '',
		batchId: '',
		studentId: '',
		certificateId: '',
		specialization: '',
		scoreEarned: '',
		totalScore: '',
		cgpa: '',
		creditsEarned: '',
		completionDate: '',
		status: ''
	}

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				private router: Router,
				private route: ActivatedRoute,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.batchId = this.route.snapshot.params['batchId'];
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
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

	getUploadedtCertificates() {
		this.url = "/certificate/draft/list";
		
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);
		params = params.append('batchId', this.batchId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

	}

	uploadCertificate(files) {
		var form = new FormData();
		form.append('file', files[0], files[0].filename);
		form.append('instituteId', this.loggedInUser.reference.instituteId);
		//form.append('affiliateId', this.loggedInUser.reference.affiliateId);
		//form.append('courseId', this.loggedInUser.reference.courseId);
		form.append('batchId', this.batchId);

		this.url = "/certificate/draft/upload";
		this.apiService.upload(this.url, form)
			.subscribe((response: any) => {
				console.log(response);
			})
	}

}

const data = [{
	instituteId: 'IID001',
	affiliateId: 'AID001',
	courseId: 'CI001',
	batchId: 'BI001',
	studentId: 'SID001',
	code: "CID001",
	specialization: "Networking",
	scoreEarned: "5000",
	totalScore: "6000",
	cgpa: "8",
	creditsEarned: "8",
	completionDate: "21/05/2019",
	status: "Active",
	_id: "5ce29b10123b421338930292"
}]
