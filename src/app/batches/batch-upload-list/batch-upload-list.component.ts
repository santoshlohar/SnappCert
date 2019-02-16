import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-batch-upload-list',
  templateUrl: './batch-upload-list.component.html',
  styleUrls: ['./batch-upload-list.component.css']
})
export class BatchUploadListComponent implements OnInit {

	url;
	loginUser;
	authUsers: [] = [];
	displayedColumns = ['userType', 'instituteId', 'departmentId', 'affInstituteId', 'username', 'emailId', 'phone', '_id'];

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor() { }

	ngOnInit() {
	}

}
