import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { UploadedCertificates } from 'src/app/modals/uploaded_certificate';

@Component({
  selector: 'app-certificate-upload-list',
  templateUrl: './certificate-upload-list.component.html',
  styleUrls: ['./certificate-upload-list.component.css']
})
export class CertificateUploadListComponent implements OnInit {

	url: string;
	certificatesData = [];
	selectedCertificates = [];
	constructor(private certificateValidator: ValidatorService) { }

	@Input() certificates = [ 
		{ name: 'Mark' },
		{ name: 'Brad' }
		] ;
	@Output() certificatesChange = new EventEmitter<UploadedCertificates[]>();
	displayedColumns = ['name', 'actionsColumn'];

	ngOnInit() {
		this.dataSource = new TableDataSource<any>(this.certificates, UploadedCertificates, this.certificateValidator);
		this.dataSource.datasourceSubject
			.subscribe((certificates) => {
				this.certificatesChange.emit(certificates)
				console.log(this.certificates)
			});

		console.log(this.dataSource);
	}

	dataSource: TableDataSource<UploadedCertificates>; 
	

}
