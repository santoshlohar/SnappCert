import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { HttpParams } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Certificate } from 'src/app/modals/certificate';

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
	affiliateId;
	certificates: Certificate[] = [];
	newCertificates: Certificate[] = [];
	selectedCertificates: any = [];
	displayedColumns = [
		'select',
		'actions',
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
				public errorDialogService: ErrorDialogService,
				public dataService: DataService) { }

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
		this.getUploadedCertificates();
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

	getUploadedCertificates() {
		this.url = "/certificate/draft/list";
		
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('affiliateId', this.affiliateId);
		params = params.append('batchId', this.batchId);

		this.apiService.get(this.url, params) 
			.subscribe((response: any) => {
				console.log(response.data);
				if(response.success == true) {
					if(response.data && response.data.drafts.length) {
						this.certificates = response.data.drafts;
						this.newCertificates = [];
						for(var i=0; i<this.certificates.length; i++) {
							this.certificates[i].isEditing = false;
							this.certificates[i].index = i;
							this.newCertificates.push(this.certificates[i]);
							this.dataSource.data = this.newCertificates;
						}
					}
				}
			});
	}

	uploadCertificate(files) {
		var form = new FormData();
		form.append('file', files[0], files[0].filename);
		form.append('instituteId', this.loggedInUser.reference.instituteId);
		form.append('departmentId', this.loggedInUser.reference.departmentId);
		form.append('affiliateId', this.affiliateId);
		form.append('batchId', this.batchId);

		this.url = "/certificate/draft/upload";
		this.apiService.upload(this.url, form)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.getUploadedCertificates();
				}
			})
	}

	edit(row) {
		var i = row.index;
		var tableData = this.dataSource.data;
		if(tableData[i].isEditing == false) {
			tableData[i].isEditing = true;
		} else {
			tableData[i].isEditing = false;
		}
		this.dataSource.data = tableData;
	}

	save(row) {
		this.url = "/certificate/draft/"+ row._id;
		var i = row.index;

		this.apiService.put(this.url, row)
			.subscribe((response: any) => {
				if(response.success == true) {
					var tableData = this.dataSource.data;
					tableData[i].isEditing = false;
					setTimeout(() => {
						this.getUploadedCertificates();
					}, 500);
				}
			})
	}

	goToFinal() {
		this.selectedCertificates = this.selection.selected;
		
		if(this.selectedCertificates.length < 1) {
			var data = {
				reason: "Please select atleast one certificate to process!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			var obj = {
				drafts: this.selectedCertificates
			}

			this.url = "/certificate/draft/process";
			console.log(obj);
			this.apiService.put(this.url, obj)
				.subscribe((response: any) => {
					console.log(response);
					this.getUploadedCertificates();
				})


		}
	}

	deleteCertificates() {
		this.selectedCertificates = this.selection.selected;
		
		if(this.selectedCertificates.length < 1) {
			var data = {
				reason: "Please select atleast one certificate to delete!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			var obj = {
				draftIds: [],
				batchId: this.batchId
			};

			for(var i=0; i<this.selectedCertificates.length; i++){
				obj.draftIds.push(this.selectedCertificates[i]._id);
			}

			this.url = "/certificate/draft/delete";
			this.apiService.post(this.url, obj)
				.subscribe((response: any) => {
					console.log(response);
					this.getUploadedCertificates();
				})


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
