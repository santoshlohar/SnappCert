import { Component, OnInit, ViewChild, Output} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadedCertificate } from '../../modals/uploaded_certificate';
import { ValidatedCertificate } from '../../modals/validated_certificate';
import { isNumber, isString } from 'util';
import { map } from 'rxjs/operators';
import { NgClass } from '@angular/common';
import { Globals } from 'src/app/globals';

@Component({
	selector: 'app-certificate-upload-list',
	templateUrl: './certificate-upload-list.component.html',
	styleUrls: ['./certificate-upload-list.component.css']
})
export class CertificateUploadListComponent implements OnInit {

	displayedColumns = [
		'select',
		'actions',
		'instituteId',
		'affiliatedInstituteId',
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
		'transactionStatus',
		'failureReason',
		'transactionMachine',
		'transactionDate',
		'transactionTime',
		'transactionUser'
	];

	url: string;
	loginUser;
	userType: string;
	certificatesData = [];
	newCertificates = [];
	selectedCertificates: any = [];
	editing: boolean = false;
	highlight: boolean;
	certificate;
	intError: boolean;
	params = {
	};
	reviewers;
	certifiers;
	reviewer = {
		id: String,
		name: String
	}

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@Output() stateRoute: string;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
		public dialoge: MatDialog,
		public router: Router,
		public globals: Globals) {
			this.stateRoute = this.router.url;
		}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getReviewersList();
		setTimeout(() => {
			this.getCertifiersList();
		}, 500);

		//this.getCertificatesList();
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

	uploadCertificate(files, filename) {
		console.log(files[0]);
		var form = new FormData();
		this.url = "/certificates/fileupload";

		form.append(filename, files[0]);
		
		this.apiService.post(this.url, form )
			.subscribe((response) => {
				console.log(response);
			})
	}

	// getCertificatesList() {
	// 	this.url = '/temp/certificates';
	// 	this.apiService.get(this.url)
	// 		.subscribe((response: UploadedCertificate[]) => {
				
	// 			this.certificatesData = response;
	// 			for(var i=0; i<this.certificatesData.length; i++) {
	// 				this.certificatesData[i].position = i;
	// 				this.certificatesData[i].editing = false;

	// 				if(this.certificatesData[i].transactionStatus == 'New') {

	// 					if(isNaN(this.certificatesData[i].scoreEarned)) {
	// 						this.certificatesData[i].scrErnErr = true;
	// 					}

	// 					if(isNaN(this.certificatesData[i].totalScore)) {
	// 						this.certificatesData[i].totalScrErr = true;
	// 					}

	// 					if(isNaN(this.certificatesData[i].creditsEarned)) {
	// 						this.certificatesData[i].creditsError = true;
	// 					}
					
	// 					this.newCertificates.push(this.certificatesData[i]);
	// 					this.dataSource.data = this.newCertificates;
						
	// 				}
	// 				//this.validatedCertificate(this.dataSource.data[i]);
	// 			}
	// 		},
	// 		(error)=> {
	// 			console.log(error)
	// 		});
	// }

	processData() {
		if(this.reviewers.length< 1) {
			alert("Before process the data, Please add Reviewers for Authorized user.")
		} else if(this.certifiers.length< 1) {
			alert("Before process the data, Please add Certifier for Authorized user.")
		} else {
			this.selectedCertificates = this.selection.selected;
			this.url = "/updatemultitempcertificate";
			if(this.selectedCertificates.length) {
				this.apiService.post(this.url, this.selectedCertificates)
					.subscribe((response: any) => {
						if(response.message == 'success') {
							this.goToFinalTable();
						} else {
							return false;
						}
					},
					(error)=> {
						var message = error.error.message;
						alert(message);
						return false;
					});
			} else {
				alert("please select atleast one certificate data to process!");
			}
		}
	}

	edit(row) {
		var tableData = this.newCertificates;
		for(var i=0;i<tableData.length;i++) {
			if(row._id == tableData[i]._id) {
				if(tableData[i].editing == false) {
					tableData[i].editing = true;
				} else {
					tableData[i].editing = false;
				}
				if(tableData[i].scrErnErr == true) {
					if(String(tableData[i].scoreEarned)) {
						tableData[i].scoreEarned = Number(tableData[i].scoreEarned);
						tableData[i].scrErnErr = false;
					}
				} else {
					if(isNaN(tableData[i].scoreEarned)) {
						tableData[i].scrErnErr = true;
					}
				}

				if(tableData[i].totalScrErr == true) {
					if(isString(tableData[i].totalScore)) {
						tableData[i].totalScore = Number(tableData[i].totalScore);
						tableData[i].totalScrErr = false;
					}
				} else {
					if(isNaN(tableData[i].totalScore)) {
						tableData[i].totalScrErr = true;
					}
				}

				if(tableData[i].creditsError == true) {
					if(isString(tableData[i].creditsEarned)) {
						tableData[i].creditsEarned = Number(tableData[i].creditsEarned);
						tableData[i].creditsError = false;
					}
				} else {
					if(isNaN(tableData[i].creditsEarned)) {
						tableData[i].creditsError = true;
					}
				}
				
				this.dataSource.data = tableData;			
			}
		}
	}

	delete(id) {
		var params = [{
			'_id' : id
		}];
		this.url = '/deltempcertificates';
		this.apiService.post(this.url, params)
			.subscribe((response) => {
				//this.getCertificatesList();
			});
	}

	deleteCertificates(){
		this.selectedCertificates = this.selection.selected;
		this.url = "/deltempcertificates";
		if(this.selectedCertificates.length) {
			//this.validatedCertificates(this.selectedCertificates);
			this.apiService.post(this.url, this.selectedCertificates)
				.subscribe((response: any) => {
					console.log(response);
				},
				(error)=> {
					console.log(error)
				});
		} else {
			alert("please select atleast one certificate data to delete!");
		}
	}

	goToFinalTable() {
		this.selectedCertificates = this.selection.selected;
		this.reviewers.length;
		this.url = '/pushcerttemp2final';

		if(this.selectedCertificates.length) {
			for(var i=0;i<this.selectedCertificates.length;i++) {
				this.selectedCertificates[i].reviewers = [];
				for(var j=0;j<this.reviewers.length;j++) {
					this.selectedCertificates[i].reviewers.push(this.reviewers[j]);
				}
				this.selectedCertificates[i].certifiers = [];
				for(var k=0;k<this.certifiers.length;k++) {
					this.selectedCertificates[i].certifiers.push(this.certifiers[k]);
				}
			};
			console.log(this.selectedCertificates)
			this.apiService.post(this.url, this.selectedCertificates)
				.subscribe((response) => {
					console.log(response);
				},
				(error)=> {
					console.log(error)
				}
			);
		} else {
			alert("please select atleast one certificate data to delete!");
		}
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
	}

	getReviewersList() {
		this.url = "/searchUsers";		
		if(this.userType == 'INS_DATA_MANAGER') {
			this.params = {
				UserType: "INST_REVIEWER",
				instituteID: this.loginUser.instituteID
			}
		} else if(this.userType == 'INST_REVIEWER') {
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
	}

}
