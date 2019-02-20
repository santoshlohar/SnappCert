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
	
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	constructor(private apiService: ApiService) { }

	ngOnInit() {
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

	uploadstudent() {

	}

	deleteStudents() {

	}

	processData() {

	}
}


