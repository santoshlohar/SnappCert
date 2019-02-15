import { Component, OnInit, ViewChild} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadedCertificate } from '../../modals/uploaded_certificate';
import { ValidatedCertificate } from '../../modals/validated_certificate';
import { isNumber, isString } from 'util';
import { map } from 'rxjs/operators';
import { NgClass } from '@angular/common';

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
	certificatesData = [];
	newCertificates = [];
	selectedCertificates = [];
	editing: boolean = false;
	highlight: boolean;
	certificate;
	intError: boolean;

	dataSource = new MatTableDataSource<any>();
	//newCertificates = new MatTableDataSource<ValidatedCertificate>(this.certificatesData);
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				public dialoge: MatDialog,
				public router: Router) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getCertificatesList();
		
	};

	// highlight(element: UploadedCertificate) {
	// 	console.log(element)
	// 	element.highlighted = !element.highlighted;
	// }

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	};

	masterToggle() {
		this.isAllSelected() ? 
			this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	};

	getCertificatesList() {
		this.url = '/temp/certificates';
		
		this.apiService.get(this.url)
			.subscribe((response: UploadedCertificate[]) => {
				
				this.certificatesData = response;
				for(var i=0; i<this.certificatesData.length; i++) {
					this.certificatesData[i].position = i;
					this.certificatesData[i].editing = false;

					if(this.certificatesData[i].transactionStatus == 'New') {

						if(isNaN(this.certificatesData[i].scoreEarned)) {
							this.certificatesData[i].scrErnErr = true;
						}

						if(isNaN(this.certificatesData[i].totalScore)) {
							this.certificatesData[i].totalScrErr = true;
						}

						if(isNaN(this.certificatesData[i].creditsEarned)) {
							this.certificatesData[i].creditsError = true;
						}
					
						this.newCertificates.push(this.certificatesData[i]);
						this.dataSource.data = this.newCertificates;
						console.log(this.dataSource.data)
						
					}
					//this.validatedCertificate(this.dataSource.data[i]);
				}
			},
			(error)=> {
				console.log(error)
			});
	};

	processData() {
		this.selectedCertificates = this.selection.selected;
		
		this.url = "/updatemultitempcertificate";
		if(this.selectedCertificates.length) {
			//this.validatedCertificates(this.selectedCertificates);
			this.apiService.post(this.url, this.selectedCertificates)
				.subscribe((response: any) => {
					console.log(response);
					if(response.message == 'success') {
						this.goToFinalTable();
					} else {
						return false;
					}
				},
				(error)=> {
					console.log(error)
					var message = error.error.message;
					alert(message);
					return false;
				});
		} else {
			alert("please select atleast one certificate data to process!");
		}
	};

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
					if(isString(tableData[i].scoreEarned)) {
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
	};

	delete(id) {
		var params = [{
			'_id' : id
		}];
		this.url = '/deltempcertificates';
		this.apiService.post(this.url, params)
			.subscribe((response) => {
				this.getCertificatesList();
			});
	};

	deleteCertificates(){
		this.selectedCertificates = this.selection.selected;
		console.log("delete multiple records.")
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

	validatedCertificates(certificates) {
		
		for(var i=0; i<certificates.length; i++) {
			var certificate = certificates[i];
			console.log(certificate);

			if(!certificate.instituteID || !certificate.afflInstituteID || !certificate.courseID
				|| !certificate.batchID || !certificate.studentID || !certificate.certificateID
				|| !certificate.completionDate) {
					alert("Please solve the errors before process the certificates data!");
					return false;
			} else if( typeof(certificate.instituteID == 'string')) {
				this.intError = true;
				
			}
		}
		
	};

	goToFinalTable() {
		this.selectedCertificates = this.selection.selected;

		this.url = '/pushcerttemp2final';

		if(this.selectedCertificates.length) {
			//this.validatedCertificates(this.selectedCertificates);
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

	// public hasError = (controlName: string, errorName: string) =>{
    //     return this.instRequestForm.controls[controlName].hasError(errorName);
    // }
}

// const certificate_data:  UploadedCertificates[] = [
// 	{
// 		instituteID: '111',
// 		afflInstituteID: 'AI01',
// 		courseID: 'CI01',
// 		batchID: '001',
// 		studentID: '001',
// 		certificateID: 3627,
// 		Specialization: "computer application",
// 		scoreEarned: 786,
// 		totalScore: 1000,
// 		CGPA: 6,
// 		creditsEarned: 6,
// 		completionDate: '12 Jan',
// 		transactionStatus: 'New',
// 		failureReason: 'Data not correct',
// 		transactionMachine: '84392',
// 		transactionDate: '29 Jan',
// 		transactionTime: '15 Hrs',
// 		transactionUser: 'Sushmita'
// 	}
// ];
