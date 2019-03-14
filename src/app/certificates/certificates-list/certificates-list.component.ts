import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'app-certificates-list',
	templateUrl: './certificates-list.component.html',
	styleUrls: ['./certificates-list.component.css']
})
export class CertificatesListComponent implements OnInit {

	displayedColumns = [
		'select',
		'actions',
		'instituteId',
		'courseId',
		'batchId',
		'studentId',
		'certificateId',
		'specialization',
		'completionDate',
		'transactionStatus'
	];

	url;
	loginUser;
	userType;
	certificatesData = [];
	newCertificates = [];
	params = {};
	reviewers;
	certifiers;
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);
	
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getReviewersList();
		setTimeout(() => {
			this.getCertifiersList();
		}, 500);
		this.getFinalCertificates();
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

	getFinalCertificates() {
		this.url = "/certificates";
		var params = '';
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.message == 'success' && response.data) {
					this.certificatesData = response.data;
					for(var i=0;i<this.certificatesData.length;i++) {
						if(this.certificatesData[i].versionStatus == "Active" && this.certificatesData[i].transactionStatus == 'New') {
							this.newCertificates.push(this.certificatesData[i]);
							this.dataSource.data = this.newCertificates;
						} else if (this.certificatesData[i].transactionStatus == 'Reviewed' || this.certificatesData[i].transactionStatus == 'Under Certify') {
							if (this.certificatesData[i].certifier1ID != this.loginUser.UserName && this.certificatesData[i].certifier2ID != this.loginUser.UserName && this.certificatesData[i].certifier3ID != this.loginUser.UserName) {
								this.newCertificates.push(this.certificatesData[i]);
								this.dataSource.data = this.newCertificates;
							}
						}
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	getCertifiersList() {
		this.url = "/searchUsers";
		if(this.userType == 'INS_DATA_MANAGER') {
			this.params = {
				UserType: "DATA_CERTIFIER",
				instituteID: this.loginUser.instituteID
			}
		} else if(this.userType == 'DATA_CERTIFIER') {
			this.params = {
				UserType: "DATA_CERTIFIER",
				instituteID: this.loginUser.instituteID,
				Department_ID: this.loginUser.Department_ID
			}
		}
		this.apiService.post(this.url, this.params)
			.subscribe((response: any) => {
				if(response.message == "success") {
					if (response.data) {
						this.certifiers = response.data;
						localStorage.setItem('certifiers', JSON.stringify(this.certifiers));
					}
				}
			},
			(error) => {
				console.log(error);
			});
	};

	getReviewersList() {
		this.url = "/searchUsers";		
		if(this.userType == 'INS_DATA_MANAGER') {
			this.params = {
				UserType: "INST_REVIEWER",
				instituteID: this.loginUser.instituteID
			}
		} else if(this.userType == 'INST_REVIEWER' || this.userType == 'DATA_CERTIFIER') {
			this.params = {
				UserType: "INST_REVIEWER",
				instituteID: this.loginUser.instituteID,
				Department_ID: this.loginUser.Department_ID
			}
		}  
		this.apiService.post(this.url, this.params)
			.subscribe((response: any) => {
				if(response.message == 'success') {
					if(response.data) {
						this.reviewers = response.data;
						localStorage.setItem('reviewers', JSON.stringify(this.reviewers));
					}
				}
			},
			(error) => {
				console.log(error);
			})
	};

}

// const certificate_data = [
// 		{
// 			instituteID: '111',
// 			afflInstituteID: 'AI01',
// 			courseID: 'CI01',
// 			batchID: '001',
// 			studentID: '001',
// 			certificateID: 3627,
// 			Specialization: "computer application",
// 			scoreEarned: 786,
// 			totalScore: 1000,
// 			CGPA: 6,
// 			creditsEarned: 6,
// 			completionDate: '12 Jan',
// 			transactionStatus: 'New',
// 			failureReason: 'Data not correct',
// 			transactionMachine: '84392',
// 			transactionDate: '29 Jan',
// 			transactionTime: '15 Hrs',
// 			transactionUser: 'Sushmita'
// 		}
// 	];
