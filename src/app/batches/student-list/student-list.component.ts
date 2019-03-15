import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
	
	url;
	loginUser;
	userType;
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);
	displayedColumns = [
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
		'comments',
		'date',
		'time',
		'username'	
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

	getAfflInsStudents() {
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
