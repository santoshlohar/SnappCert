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
// 		Institute_ID: '111',
// 		Affiliated_Institute_ID: 'AI01',
// 		Course_ID: 'CI01',
// 		Batch_ID: '001',
// 		Student_ID: '001',
// 		Certificate_ID: 3627,
// 		Specialization: "computer application",
// 		Score_Earned: 786,
// 		Total_Score: 1000,
// 		CGPA: 6,
// 		Credits_Earned: 6,
// 		Completion_Date: '12Jan',
// 		Transaction_Status: 'New',
// 		Failure_Reason: 'Data not correct',
// 		Transaction_Machine: '84392',
// 		Transaction_Date: '29 Jan',
// 		Transaction_Time: '15 Hrs',
// 		Transaction_User: 'Sushmita'
// 	},
// 	{
// 		Institute_ID: '1',
// 		Affiliated_Institute_ID: 'AI01',
// 		Course_ID: 'CI01',
// 		Batch_ID: '001',
// 		Student_ID: '001',
// 		Certificate_ID: 3627,
// 		Specialization: "computer application",
// 		Score_Earned: 786,
// 		Total_Score: 1000,
// 		CGPA: 6,
// 		Credits_Earned: 6,
// 		Completion_Date: '12Jan',
// 		Transaction_Status: 'New',
// 		Failure_Reason: 'Data not correct',
// 		Transaction_Machine: '84392',
// 		Transaction_Date: '29 Jan',
// 		Transaction_Time: '15 Hrs',
// 		Transaction_User: 'Sushmita'
// 	},
// 	{
// 		Institute_ID: '1',
// 		Affiliated_Institute_ID: 'AI01',
// 		Course_ID: 'CI01',
// 		Batch_ID: '001',
// 		Student_ID: '001',
// 		Certificate_ID: 3627,
// 		Specialization: "computer application",
// 		Score_Earned: 786,
// 		Total_Score: 1000,
// 		CGPA: 6,
// 		Credits_Earned: 6,
// 		Completion_Date: '12Jan',
// 		Transaction_Status: 'New',
// 		Failure_Reason: 'Data not correct',
// 		Transaction_Machine: '84392',
// 		Transaction_Date: '29 Jan',
// 		Transaction_Time: '15 Hrs',
// 		Transaction_User: 'Sushmita'
// 	},
// 	{
// 		Institute_ID: '1',
// 		Affiliated_Institute_ID: 'AI01',
// 		Course_ID: 'CI01',
// 		Batch_ID: '001',
// 		Student_ID: '001',
// 		Certificate_ID: 3627,
// 		Specialization: "computer application",
// 		Score_Earned: 786,
// 		Total_Score: 1000,
// 		CGPA: 6,
// 		Credits_Earned: 6,
// 		Completion_Date: '12Jan',
// 		Transaction_Status: 'New',
// 		Failure_Reason: 'Data not correct',
// 		Transaction_Machine: '84392',
// 		Transaction_Date: '29 Jan',
// 		Transaction_Time: '15 Hrs',
// 		Transaction_User: 'Sushmita'
// 	},
// 	{
// 		Institute_ID: '1',
// 		Affiliated_Institute_ID: 'AI01',
// 		Course_ID: 'CI01',
// 		Batch_ID: '001',
// 		Student_ID: '001',
// 		Certificate_ID: 3627,
// 		Specialization: "computer application",
// 		Score_Earned: 786,
// 		Total_Score: 1000,
// 		CGPA: 6,
// 		Credits_Earned: 6,
// 		Completion_Date: '12Jan',
// 		Transaction_Status: 'New',
// 		Failure_Reason: 'Data not correct',
// 		Transaction_Machine: '84392',
// 		Transaction_Date: '29 Jan',
// 		Transaction_Time: '15 Hrs',
// 		Transaction_User: 'Sushmita'
// 	},
// 	{
// 		Institute_ID: '1',
// 		Affiliated_Institute_ID: 'AI01',
// 		Course_ID: 'CI01',
// 		Batch_ID: '001',
// 		Student_ID: '001',
// 		Certificate_ID: 3627,
// 		Specialization: "computer application",
// 		Score_Earned: 786,
// 		Total_Score: 1000,
// 		CGPA: 6,
// 		Credits_Earned: 6,
// 		Completion_Date: '12Jan',
// 		Transaction_Status: 'New',
// 		Failure_Reason: 'Data not correct',
// 		Transaction_Machine: '84392',
// 		Transaction_Date: '29 Jan',
// 		Transaction_Time: '15 Hrs',
// 		Transaction_User: 'Sushmita'
// 	}
// ];
