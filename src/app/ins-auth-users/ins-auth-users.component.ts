import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
	selector: 'app-ins-auth-users',
	templateUrl: './ins-auth-users.component.html',
	styleUrls: ['./ins-auth-users.component.css']
})
export class InsAuthUsersComponent implements OnInit {
	displayedColumns = ['position', 'instituteId', 'deptId', 'reviewer', 'authorityTitle', 'name', 'email', 'phone'];
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
	reviewer: string;
	authorityTitle: string;
	name: string;
	email: string;
	phone: number;
}

const ELEMENT_DATA: AffInstitutes[] = [
	{position: 1, instituteId: 'Hydrogen', deptId: 'abc', reviewer: 'H', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 2, instituteId: 'Helium', deptId: 'abc', reviewer: 'He', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 3, instituteId: 'Lithium', deptId: 'abc', reviewer: 'Li', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 4, instituteId: 'Beryllium', deptId: 'UK', reviewer: 'Be', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 5, instituteId: 'Boron', deptId: 'abc', reviewer: 'B', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 6, instituteId: 'Carbon', deptId: 'abc', reviewer: 'C', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 7, instituteId: 'Nitrogen', deptId: 'abc', reviewer: 'N', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 8, instituteId: 'Oxygen', deptId: 'abc', reviewer: 'O', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 9, instituteId: 'Fluorine', deptId: 'abc', reviewer: 'F', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 10, instituteId: 'Neon', deptId: 'abc', reviewer: 'Ne', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
];
