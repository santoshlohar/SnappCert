import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../modals/user';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	url;
	loginUser;
	authUsers: [] = [];
	displayedColumns = ['userType', 'instituteId', 'departmentId', 'affInstituteId', 'username', 'emailId', 'phone', 'status', '_id'];

	dataSource = new MatTableDataSource<User>();
	selection = new SelectionModel<User>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				private router: Router,
				public globals: Globals) { 
					this.globals.stateRoute = this.router.url;
				}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem("user"));
		if(this.loginUser.UserType === 'INST_ADMIN') {
			this.getInstituteUsers();
		} else if(this.loginUser.UserType === 'AFF_INS_DATA_MANAGER') {
			this.getAffInstituteUsers();
		}
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;	
	}

	getInstituteUsers() {
		var instituteID = this.loginUser.instituteID;
		this.url = "/usesrbyinstitute/" + instituteID;
		var params = '';
		this.apiService.get(this.url, params)
		 	.subscribe((response) => {
				 console.log(response);
				 if(response.message == "success") {
					 this.authUsers = response.data;
					 for (var i = 0; i < response.data.length; i++) {
						if(response.data[i].status == "Active") {
							response.data[i].activatedd = 'Inactive';
						}
						if(response.data[i].status == "Inactive") {
							response.data[i].activatedd = 'Active';
						}
					 }
					//  
					 this.dataSource.data = this.authUsers;
				 } else {
					 alert("");
				 }
			 })
	};

	activate(data) {
		var userId = data._id;
		this.url = "/usesrbyinstitute/" + userId;

		this.apiService.put(this.url, data)
			.subscribe((response) => {
				this.getInstituteUsers();
			});
	}

	// getInstituteUsers() {
	// 	var instituteID = this.loginUser.instituteID;
	// 	this.url = "/usesrbyinstitute/" + instituteID;

	// 	this.apiService.get(this.url)
	// 		.subscribe((response) => {
	// 			if(response.message == 'success') {
	// 				this.authUsers = response.data;
	// 				this.dataSource.data = this.authUsers;
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 			alert(error.error.message);
	// 			return false;
	// 		})
	// }

	getAffInstituteUsers() {
		var affInstituteId = this.loginUser.Affliated_Institute_ID;
		this.url = '/usesrbyafflinstitute/' + affInstituteId;
		var params = '';
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.message == 'success') {
					this.authUsers = response.data;
					this.dataSource.data = this.authUsers;
				}
			},
			(error) => {
				alert(error.error.message);
				return false;
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