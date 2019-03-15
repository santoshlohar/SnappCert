import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-batch-list',
	templateUrl: './batch-list.component.html',
	styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {

	url;
	loginUser;
	userType;
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);
	displayedColumns = [
		'actions',
		'instituteId',
		'affInstId',
		'courseId',
		'batchId',
		'batchYear',
		'minCredits',
		'minCgpa',
		'totalCgpa',
		'minScore',
		'totalScore',
		'termType',
		'termId',
		'termStart',
		'termEnd',
		'transactionStatus',
		'date',
		'time',
		'userName'	
	];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
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

	getAfflInsBatches() {
		this.url = "";
		var data;
		this.apiService.get(this.url, data)
			.subsribe((response) => {
				console.log(response)
			},
			(error) => {
				console.log(error);
			})
	}
 }
