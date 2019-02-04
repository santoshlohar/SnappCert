import { Component, OnInit, ViewChild} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadedCertificates } from 'src/app/modals/uploaded_certificate';

@Component({
	selector: 'app-certificate-upload-list',
	templateUrl: './certificate-upload-list.component.html',
	styleUrls: ['./certificate-upload-list.component.css']
})
export class CertificateUploadListComponent implements OnInit {
	
	displayedColumns = ['instituteId', 'affiliatedInstituteId', 'courseId', 'batchId', 'studentId', 'certificateId', 'specialization', 'scoreEarned', 'totalScore', 'cgpa', 'creditsEarned', 'completionDate', 'transactionStatus', 'failureReason', 'transactionMachine', 'transactionDate', 'transactionTime', 'transactionUser'];
	url: string;
	certificatesData = [];

	dataSource = new MatTableDataSource<UploadedCertificates>(this.certificatesData);
	selection = new SelectionModel<UploadedCertificates>(true, []);

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

	getCertificatesList() {
		this.url = '/temp/certificates';

		this.apiService.get(this.url)
			.subscribe(response => {
				this.certificatesData = response;
				console.log(this.certificatesData);
				this.dataSource.data = this.certificatesData;
			})
	}

	processData() {
		console.log("process");
		
	}
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
