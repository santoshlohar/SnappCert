import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ErrorCollector } from '@angular/compiler';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-certificates-final',
	templateUrl: './certificates-final.component.html',
	styleUrls: ['./certificates-final.component.css']
})
export class CertificatesFinalComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	url;
	batchId;
	affiliateId;
	selectedCertificates: any = [];
	certificate;
	certificates = [];
	displayedColumns = [
		'select',
		'instituteId', 
		'affiliateId', 
		'courseId', 
		'batchId',
		'studentId',
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

	constructor(private router: Router,
				private apiService: ApiService,
				private route: ActivatedRoute,
				private dataService: DataService,
				private errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.batchId = this.route.snapshot.params['batchId'];
		var affiliate = this.dataService.getAffiliate();
		this.affiliateId = affiliate;
		this.dataService.setBatch(this.batchId);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.getCertificates();
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

	getCertificates() {
		this.url = "/certificate/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('affiliateId', this.affiliateId);
		params = params.append('batchId', this.batchId);

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					if(response.data.certificates) {
						this.certificates = response.data.certificates;
						this.dataSource.data = this.certificates;
					}
				}
			});
	}

	viewCertificate() {
		this.selectedCertificates = this.selection.selected;

		if(this.selectedCertificates.length !== 1) {
			var data = {
				reason: "Please select one student!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.certificate = this.selectedCertificates[0];
			this.router.navigate(['/certificateView/'+ this.certificate._id]);
		}
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