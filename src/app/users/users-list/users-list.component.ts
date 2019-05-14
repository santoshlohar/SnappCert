import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserModel } from '../../modals/user';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	url;
	activated;
	loginUser;
	users: any[] = [];
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
		role: '',
		instituteId: '',
		departmentId: '',
		affiliateId: '',
		firstName: '',
		email: '',
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
		this.getUsers();
		this.filterByColumn();
	}

	getUsers() {
		this.url = "/user/list";

		var params = new HttpParams();
		params = params.append('instituteId', this.loginUser.reference.instituteId);
		if(this.loginUser.reference.departmentId !== "111111111111111111111111") {
			params = params.append('departmentId', this.loginUser.reference.departmentId);
		}
		if(this.loginUser.reference.affiliateId !== "111111111111111111111111") {
			params = params.append('affiliateId', this.loginUser.reference.affiliateId);
		}
		
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true ) {
					if(response.data.users ) {
						this.users = response.data.users;
						for(var i=0;i<this.users.length;i++) {
							if(this.users[i].isActive == true) {
								this.users[i].status = "Active";
							} else {
								this.users[i].status = "Inactive";
							}
						}
						this.dataSource.data = this.users;
					}
				} 
			});
	};

	changeStatus(row) {
		var userId = row._id;
		this.url = '/user/'+ userId +'/changeStatus';
		var data = {
			isActive: row.isActive
		};

		if(row.isActive == true) {
			data.isActive = false;
		} else {
			data.isActive = true;
		}
		this.apiService.put(this.url, data)
			.subscribe((response) => {
				if(response.success == true) {
					this.getUsers();
				}
			});
	}

	editUser(row) {
		this.router.navigate(['/userEdit/'+ row._id]);
	}

	filterByColumn() {
		this.roleFilter.valueChanges.subscribe((roleFilterValue) => {
			this.filteredValues['role'] = roleFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
			this.filteredValues['instituteId'] = instituteIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.deptIdFilter.valueChanges.subscribe((deptIdFilterValue) => {
			this.filteredValues['departmentId'] = deptIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstIdFilter.valueChanges.subscribe((affInstIdFilterValue) => {
			this.filteredValues['affiliateId'] = affInstIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
			this.filteredValues['firstName'] = nameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});
		
		this.emailFilter.valueChanges.subscribe((emailFilterValue) => {
			this.filteredValues['email'] = emailFilterValue;
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
			return data.reference.role.toString().trim().toLowerCase().indexOf(searchString.role) !== -1
			&& data.institute.code.toString().trim().toLowerCase().indexOf(searchString.instituteId) !== -1
			&& data.department.code.toString().trim().toLowerCase().indexOf(searchString.departmentId) !== -1
			&& data.affiliate.code.toString().trim().toLowerCase().indexOf(searchString.affiliateId) !== -1
			&& data.firstName.toString().trim().toLowerCase().indexOf(searchString.firstName) !== -1
			&& data.email.toString().trim().toLowerCase().indexOf(searchString.email) !== -1
			&& data.phoneNumber.toString().trim().toLowerCase().indexOf(searchString.phoneNumber) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
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