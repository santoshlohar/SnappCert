import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-upload-list',
  templateUrl: './student-upload-list.component.html',
  styleUrls: ['./student-upload-list.component.css']
})
export class StudentUploadListComponent implements OnInit {

	displayedColumns = [
		'select',
		'actions', 
		'batchId', 
		'studentId', 
		'name', 
		'fatherName',
		'dob',
		'aadhaar',
		'emailId',
		'mobile',
		'specialization',
		'transactionStatus',
		'failure',
		'transactionMachine',
		'transactiondate',
		'transactiontime',
		'transactionUser'
	];
	url;
	
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.getTempStudents();
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

	uploadstudent(files, filename) {
		var form = new FormData();
		form.append(filename, files[0]);

		this.url = '/studentdet/fileupload';
		this.apiService.post(this.url, form)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			});
	}

	getTempStudents() {
		this.url = "/temp/studentdet";
		this.apiService.get(this.url)
			.subscribe((response) => {
				console.log(response)
			},
			(error) => {
				console.log(error);
			})
	}

	deleteStudents() {

	}

	processData() {

	}
}


