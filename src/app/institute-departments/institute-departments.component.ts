import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { InstituteDepts } from '../model/institutes-depts';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-institute-departments',
	templateUrl: './institute-departments.component.html',
	styleUrls: ['./institute-departments.component.css']
})

export class InstituteDepartmentsComponent implements OnInit {

	displayedColumns = ['instituteId', 'deptId', 'deptName', '_id'];
	url: string;
	Departments: InstituteDepts[] = [];
	dataSource = new MatTableDataSource<InstituteDepts>(this.Departments);
	selection = new SelectionModel<InstituteDepts>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				public dialoge: MatDialog,
				public router: Router) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getDepartments();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getDepartments() {
		console.log("Get dept");
		this.url = '/departments';
		this.apiService.get(this.url)
			.subscribe((response) => {
				console.log(response.body);
				this.Departments = response.body;
				this.dataSource.data = this.Departments;
			});
	}

	editDepartment(deptId) {
		console.log(deptId);
		this.router.navigate(['/editDepartment/', deptId ])
	};

}


@Component({
	selector: 'edit-department',
	templateUrl: 'edit-department.html',
  })
  export class EditDepartment {
	constructor() {}
  }

// const ELEMENT_DATA: InstituteDepts[] = [
// 	{position: 1, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 2, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 3, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 4, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 5, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 6, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 7, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 8, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 9, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
// 	{position: 10, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'}
// ];
