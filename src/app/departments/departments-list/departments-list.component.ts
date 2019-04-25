import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { InstituteDepts } from '../../modals/institute-depts';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Globals } from 'src/app/globals';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  	displayedColumns = ['deptId', 'deptName', 'status', 'actions'];
	url: string;
	loggedInUser;
	activated;
	departments: any[] = [];
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	instituteIdFilter = new FormControl();
	departmentIdFilter = new FormControl();
	departmentNameFilter = new FormControl();
	departmentStatusFilter = new FormControl();

	filteredValues = {
		code: '',
		name: '',
		status: ''
	}

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				public dialoge: MatDialog,
				public router: Router) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getDepartments();
		this.filterByColumn();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	};

	getDepartments() {
		this.url = "/department/list";
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.instituteId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		this.apiService.httpOptions.params = params;
		
		this.apiService.get(this.url)
			.subscribe((response) => {
				if(response.success == true) {
					this.departments = response.data;
					for(var i=0;i<this.departments.length;i++) {
						if(this.departments[i].isActive == true) {
							this.departments[i].status = "Active";
						} else {
							this.departments[i].status = "Inactive";
						}
					}
					this.dataSource.data = this.departments;
				}
			})
	}

	editDepartment(data) {
		var deptId = data._id;
		this.url = '/department/';
		this.apiService.put(this.url + deptId, data)
			.subscribe((response) => {
				console.log(response);
			})
	};

	changeStatus(row) {
		var deptId = row._id;
		this.url = '/department/'+ deptId +'/changeStatus';
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
					this.getDepartments();
				}
			});
	}

	filterByColumn() {

		this.departmentIdFilter.valueChanges.subscribe((departmentIdFilterValue) => {
			this.filteredValues['code'] = departmentIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.departmentNameFilter.valueChanges.subscribe((departmentNameFilterValue) => {
			this.filteredValues['name'] = departmentNameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.departmentStatusFilter.valueChanges.subscribe((departmentStatusFilterValue) => {
			this.filteredValues['status'] = departmentStatusFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		})

		this.dataSource.filterPredicate = this.customFilterPredicate();
	};

	customFilterPredicate() {
		const myFilterPredicate = function(data:InstituteDepts, filter: string): boolean {
			let searchString = JSON.parse(filter);
			return data.code.toString().trim().toLowerCase().indexOf(searchString.code) !== -1
			&& data.name.toString().trim().toLowerCase().indexOf(searchString.name) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}

}
