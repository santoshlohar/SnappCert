import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
	selector: 'app-institute-departments',
	templateUrl: './institute-departments.component.html',
	styleUrls: ['./institute-departments.component.css']
})

export class InstituteDepartmentsComponent implements OnInit {

	displayedColumns = ['position', 'instituteId', 'deptId', 'department', 'dm1Name', 'dm1Email', 'dm1Phn'];
	dataSource = new MatTableDataSource<AffInstitutes>(ELEMENT_DATA);
	selection = new SelectionModel<AffInstitutes>(true, []);

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

export interface AffInstitutes {
	instituteId: string;
	position: number;
	deptId: string;
	department: string;
	dm1Name: string;
	dm1Email: string;
	dm1Phn: number;
}

const ELEMENT_DATA: AffInstitutes[] = [
	{position: 1, instituteId: 'Hydrogen', deptId: 'abc', department: 'H', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 2, instituteId: 'Helium', deptId: 'abc', department: 'He', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 3, instituteId: 'Lithium', deptId: 'abc', department: 'Li', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 4, instituteId: 'Beryllium', deptId: 'UK', department: 'Be', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 5, instituteId: 'Boron', deptId: 'abc', department: 'B', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 6, instituteId: 'Carbon', deptId: 'abc', department: 'C', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 7, instituteId: 'Nitrogen', deptId: 'abc', department: 'N', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 8, instituteId: 'Oxygen', deptId: 'abc', department: 'O', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 9, instituteId: 'Fluorine', deptId: 'abc', department: 'F', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 10, instituteId: 'Neon', deptId: 'abc', department: 'Ne', dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
];
