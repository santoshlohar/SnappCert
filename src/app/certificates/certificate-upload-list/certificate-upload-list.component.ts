import { Component, OnInit, ViewChild} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadedCertificate } from '../../modals/uploaded_certificate';
import { ValidatedCertificate } from '../../modals/validated_certificate';
import { isNumber, isString } from 'util';
import { map } from 'rxjs/operators';

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
	selectedCertificates = [];
	editing: boolean = false;
	highlight: boolean;

	dataSource = new MatTableDataSource<UploadedCertificate>();
	//newCertificates = new MatTableDataSource<ValidatedCertificate>(this.certificatesData);
	selection = new SelectionModel<UploadedCertificate>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				public dialoge: MatDialog,
				public router: Router) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getCertificatesList();
		
	}

	// highlight(element: UploadedCertificate) {
	// 	console.log(element)
	// 	element.highlighted = !element.highlighted;
	// }

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ? 
			this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	}

	getCertificatesList() {
		this.url = '/temp/certificates';
		
		this.apiService.get(this.url)
			.pipe(
				map((response: UploadedCertificate[]) => {
					console.log(response)

					this.dataSource.data = response;
					this.certificatesData = this.dataSource.data;
					return this.certificatesData;
				})
			)
			.subscribe((response) => {
				console.log(response)
				for(var i=0; i<this.dataSource.data.length; i++) {
					this.dataSource.data[i].position = i;
					this.dataSource.data[i].editing = false;
				}
			},
			(error)=> {
				console.log(error)
			});
	}

	processData() {
		this.selectedCertificates = this.selection.selected;
		this.url = "/multicertificate";
		if(this.selectedCertificates.length) {
			this.apiService.post(this.url, this.selectedCertificates)
				.subscribe((response) => {
					console.log(response);
				})
		} else {
			alert("please select atleast one certificate data to process!");
		}
	}

	edit(row) {
		var tableData = this.dataSource.data;
		for(var i=0;i<tableData.length;i++) {
			if(row._id == tableData[i]._id) {
				if(tableData[i].editing == false) {
					this.dataSource.data[i].editing = true;
					if( (this.dataSource.data[i].instituteID) && typeof(this.dataSource.data[i].instituteID) == "number" ){
						this.highlight = false;
					} else {
						this.highlight = true;
					}
					return this.dataSource.data[i]
				} else {
					this.dataSource.data[i].editing = false;
				}
				break;
			}
		}
	}

	ValidatedCertificate(data) {
		console.log(data)
		var tableData = this.dataSource.data;
		if(data.instituteID == '') {
			this.highlight = true;
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
