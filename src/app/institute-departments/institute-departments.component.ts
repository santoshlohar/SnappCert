import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { InstituteDepts } from '../model/institutes-depts';

@Component({
	selector: 'app-institute-departments',
	templateUrl: './institute-departments.component.html',
	styleUrls: ['./institute-departments.component.css']
})

export class InstituteDepartmentsComponent implements OnInit {

	displayedColumns = ['position', 'instituteId', 'instituteName', 'deptId', 'deptName'];
	dataSource = new MatTableDataSource<InstituteDepts>(ELEMENT_DATA);
	selection = new SelectionModel<InstituteDepts>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor() { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}

const ELEMENT_DATA: InstituteDepts[] = [
	{position: 1, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 2, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 3, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 4, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 5, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 6, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 7, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 8, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 9, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'},
	{position: 10, instituteId: 'Hydrogen', instituteName: 'fhsdf', deptId: 'abc', deptName: 'H'}
];
