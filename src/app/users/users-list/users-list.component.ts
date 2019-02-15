import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../modals/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	url;
	loginUser;
	authUsers: [] = [];
	displayedColumns = ['userType', 'instituteId', 'departmentId', 'affInstituteId', 'username', 'emailId', 'phone', '_id'];

	dataSource = new MatTableDataSource<User>();
	selection = new SelectionModel<User>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService) { 
		
	}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem("user"));
		if(this.loginUser.UserType === 'INST_ADMIN') {
			this.getInstituteUsers();
		} else if(this.loginUser.UserType === 'INS_DATA_MANAGER') {
			this.getAffInstituteUsers();
		}
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		
	}

	getInstituteUsers() {
		var instituteID = this.loginUser.Institution_ID;
		this.url = "/usesrbyinstitute/" + instituteID;

		this.apiService.get(this.url)
			.subscribe((response) => {
				if(response.message == 'success') {
					this.authUsers = response.data;
					this.dataSource.data = this.authUsers;
					console.log(this.authUsers);
				}
			},
			(error) => {
				console.log(error);
			})
	}

	getAffInstituteUsers() {
		var affInstituteId = this.loginUser.Affliated_Institute_ID;
		this.url = '/usesrbyafflinstitute/' + affInstituteId;

		this.apiService.get(this.url)
			.subscribe((response) => {
				if(response.message == 'success') {
					this.authUsers = response.data;
					this.dataSource.data = this.authUsers;
				}
			})
	}

}

// const user_data:any[] = [
// 	{
// 		userType: 'Inst Admin',
// 		instituteID: '111',
// 		departmentId: 'DI01',
// 		afflInstituteID: 'AI01',
// 		username: 'Sushmita',
// 		emailId: 'sushmita.pundir@gmail.com',
// 		phone: '001'
// 	}
// ];