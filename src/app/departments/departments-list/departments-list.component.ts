import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { InstituteDepts } from '../../modals/institute-depts';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  	displayedColumns = ['instituteId', 'deptId', 'deptName', 'status', 'actions'];
	url: string;
	activated;
	departments: any[] = [];
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	instituteIdFilter = new FormControl();
	departmentIdFilter = new FormControl();
	departmentNameFilter = new FormControl();
	departmentStatusFilter = new FormControl();

	filteredValues = {
		Institution_ID: '',
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
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getDepartments();
		this.filterByColumn();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	};

	getDepartments() {
		this.url = '/departments';
		var params = '';
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.message == 'success') {
					this.departments = response.data;
					for(var i=0;i<this.departments.length;i++) {
						if(this.departments[i].status == 'Active') {
							this.departments[i].activated = 'Inactive';
						}
						if( this.departments[i].status == 'Inactive') {
							this.departments[i].activated = 'Active';
						}
						this.dataSource.data = this.departments;
					}
				} else {
					alert("");
				}
			});
	};

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

	filterByColumn() {
		this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
			this.filteredValues['Institution_ID'] = instituteIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.departmentIdFilter.valueChanges.subscribe((departmentIdFilterValue) => {
			this.filteredValues['department_ID'] = departmentIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.departmentNameFilter.valueChanges.subscribe((departmentNameFilterValue) => {
			this.filteredValues['department_Name'] = departmentNameFilterValue;
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
			return data.Institution_ID.toString().trim().toLowerCase().indexOf(searchString.Institution_ID) !== -1
			&& data.department_ID.toString().trim().toLowerCase().indexOf(searchString.department_ID) !== -1
			&& data.department_Name.toString().trim().toLowerCase().indexOf(searchString.department_Name) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}

}
