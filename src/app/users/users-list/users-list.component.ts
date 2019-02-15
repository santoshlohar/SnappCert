import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../modals/user';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	displayedColumns = ['userType', 'instituteId', 'departmentId', 'affInstituteId', 'username', 'emailId', 'phone', '_id'];

	dataSource = new MatTableDataSource<User>(user_data);
	selection = new SelectionModel<User>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor() { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

}

const user_data:any[] = [
	{
		userType: 'Inst Admin',
		instituteID: '111',
		departmentId: 'DI01',
		afflInstituteID: 'AI01',
		username: 'Sushmita',
		emailId: 'sushmita.pundir@gmail.com',
		phone: '001'
	}
];