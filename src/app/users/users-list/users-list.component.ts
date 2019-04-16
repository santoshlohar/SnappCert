import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserModel } from '../../modals/user';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	url;
	activated;
	loginUser;
	authUsers: [] = [];
	displayedColumns = [ 'userType', 'instituteId', 'departmentId', 'affInstituteId', 'username', 'emailId', 'phone', 'status', '_id'];

	dataSource = new MatTableDataSource<UserModel>();
	selection = new SelectionModel<UserModel>(true, []);

	roleFilter = new FormControl();
	instituteIdFilter = new FormControl();
	deptIdFilter = new FormControl();
	affInstIdFilter = new FormControl();
	nameFilter = new FormControl();
	emailFilter = new FormControl();
	phoneFilter = new FormControl();
	statusFilter = new FormControl();


	filteredValues = {
		UserType: '',
		instituteID: '',
		Department_ID: '',
		Affliated_Institute_ID: '',
		UserName: '',
		emailId: '',
		phoneNumber: '',
		status: ''
	}

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				private router: Router,
				public globals: Globals) { 
					this.globals.stateRoute = this.router.url;
				}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem("user"));
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		if(this.loginUser.UserType === 'INST_ADMIN' || this.loginUser.UserType === 'INS_DATA_MANAGER') {
			this.getInstituteUsers();
		} else if(this.loginUser.UserType === 'AFF_INS_DATA_MANAGER') {
			this.getAffInstituteUsers();
		}
		this.filterByColumn();
	}

	getInstituteUsers() {
		var instituteID = this.loginUser.instituteID;
		this.url = "/usesrbyinstitute/" + instituteID;
		var params = '';
		this.apiService.get(this.url, params)
		 	.subscribe((response) => {
				if(response.message == "success") {
					this.authUsers = response.data;
					for (var i = 0; i < response.data.length; i++) {
						var status = response.data[i].status;
						if (status == "Active") {
							response.data[i].activated = "Inactive"; 
						} else if (status == "Inactive") {
							response.data[i].activated = "Active";
						}
						this.dataSource.data = this.authUsers;
					}
				} else {
					alert("");
				}
			})
	};

	activate(data) {
		var userId = data._id;
		this.url = '/usesrbyinstitute/';
		this.apiService.put(this.url + userId, data)
			.subscribe((response) => {
				if (this.loginUser.UserType === "INST_ADMIN" || this.loginUser.UserType === "INS_DATA_MANAGER") {
					this.getInstituteUsers();
				} else if (this.loginUser.UserType === "AFF_INS_DATA_MANAGER") {
					this.getAffInstituteUsers();
				}
			});
	}

	getAffInstituteUsers() {
		var affInstituteId = this.loginUser.Affliated_Institute_ID;
		this.url = '/usesrbyafflinstitute/' + affInstituteId;
		var params;
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.message == 'success') {
					this.authUsers = response.data;
					for (var i = 0; i < response.data.length; i++) {
						var status = response.data[i].status;
						if (status == "Active") {
							response.data[i].activated = "Inactive";
						} else if (status == "Inactive") {
							response.data[i].activated = "Active";
						}
						this.dataSource.data = this.authUsers;
					}
				}
			},
			(error) => {
				alert(error.error.message);
				return false;
			})
	}

	editUser(row) {
		this.router.navigate(['/userEdit/'+ row._id]);
	}

	filterByColumn() {
		this.roleFilter.valueChanges.subscribe((roleFilterValue) => {
			this.filteredValues['UserType'] = roleFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
			this.filteredValues['instituteID'] = instituteIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.deptIdFilter.valueChanges.subscribe((deptIdFilterValue) => {
			this.filteredValues['Department_ID'] = deptIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstIdFilter.valueChanges.subscribe((affInstIdFilterValue) => {
			this.filteredValues['Affliated_Institute_ID'] = affInstIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
			this.filteredValues['UserName'] = nameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});
		
		this.emailFilter.valueChanges.subscribe((emailFilterValue) => {
			this.filteredValues['emailId'] = emailFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.phoneFilter.valueChanges.subscribe((phoneFilterValue) => {
			this.filteredValues['phoneNumber'] = phoneFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.statusFilter.valueChanges.subscribe((statusFilterValue) => {
			this.filteredValues['status'] = statusFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.dataSource.filterPredicate = this.customFilterPredicate();
	}

	customFilterPredicate() {
		const myFilterPredicate = function(data:UserModel, filter: string): boolean {
			let searchString = JSON.parse(filter);
			return data.UserType.toString().trim().toLowerCase().indexOf(searchString.UserType) !== -1
			&& data.instituteID.toString().trim().toLowerCase().indexOf(searchString.instituteID) !== -1
			&& data.Department_ID.toString().trim().toLowerCase().indexOf(searchString.Department_ID) !== -1
			&& data.Affliated_Institute_ID.toString().trim().toLowerCase().indexOf(searchString.Affliated_Institute_ID) !== -1
			&& data.UserName.toString().trim().toLowerCase().indexOf(searchString.UserName) !== -1
			&& data.emailId.toString().trim().toLowerCase().indexOf(searchString.emailId) !== -1
			&& data.phoneNumber.toString().trim().toLowerCase().indexOf(searchString.phoneNumber) !== -1
			// && data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
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