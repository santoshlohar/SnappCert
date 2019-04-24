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
		department_ID: '',
		department_Name: '',
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
		//this.filterByColumn();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	};

	getDepartments() {
		this.url = "/department/list";
		var p = new HttpParams();
		p = p.append('instituteId', this.loggedInUser.instituteId);
		p = p.append('skip', '0');
		p = p.append('limit', '10');

		this.apiService.httpOptions.params = p;
		
		this.apiService.get(this.url)
			.subscribe((response) => {
				console.log(response);
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
		this.url = '/departments/';
		this.apiService.put(this.url + deptId, data)
			.subscribe((response) => {
				console.log(response);
			})
	};

	activate(data) {
		var deptId = data._id;
		this.url = '/departments/';
		this.apiService.put(this.url + deptId, data)
			.subscribe((response) => {
				this.getDepartments();
			});
	}

	// filterByColumn() {
	// 	this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
	// 		this.filteredValues['Institution_ID'] = instituteIdFilterValue;
	// 		this.dataSource.filter = JSON.stringify(this.filteredValues);
	// 	});

	// 	this.departmentIdFilter.valueChanges.subscribe((departmentIdFilterValue) => {
	// 		this.filteredValues['department_ID'] = departmentIdFilterValue;
	// 		this.dataSource.filter = JSON.stringify(this.filteredValues);
	// 	});

	// 	this.departmentNameFilter.valueChanges.subscribe((departmentNameFilterValue) => {
	// 		this.filteredValues['department_Name'] = departmentNameFilterValue;
	// 		this.dataSource.filter = JSON.stringify(this.filteredValues);
	// 	});

	// 	this.departmentStatusFilter.valueChanges.subscribe((departmentStatusFilterValue) => {
	// 		this.filteredValues['status'] = departmentStatusFilterValue;
	// 		this.dataSource.filter = JSON.stringify(this.filteredValues);
	// 	})

	// 	this.dataSource.filterPredicate = this.customFilterPredicate();
	// };

	// customFilterPredicate() {
	// 	const myFilterPredicate = function(data:InstituteDepts, filter: string): boolean {
	// 		let searchString = JSON.parse(filter);
	// 		return data.instituteId.toString().trim().toLowerCase().indexOf(searchString.instituteId) !== -1
	// 		&& data._id.toString().trim().toLowerCase().indexOf(searchString._id) !== -1
	// 		&& data.name.toString().trim().toLowerCase().indexOf(searchString.name) !== -1
	// 		&& data.isActive.toString().trim().toLowerCase().indexOf(searchString.isActive) !== -1
	// 	}
	// 	return myFilterPredicate;
	// }

}
