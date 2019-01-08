import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
	selector: 'app-aff-ins-auth-users',
	templateUrl: './aff-ins-auth-users.component.html',
	styleUrls: ['./aff-ins-auth-users.component.css']
})
export class AffInsAuthUsersComponent implements OnInit {
	displayedColumns = ['position', 'instituteId', 'affiliated', 'deptId', 'reviewer', 'authorityTitle', 'name', 'email', 'phone'];
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
	affiliated: boolean;
	deptId: string;
	reviewer: string;
	authorityTitle: string;
	name: string;
	email: string;
	phone: number;
}

const ELEMENT_DATA: AffInstitutes[] = [
	{position: 1, instituteId: 'Hydrogen', affiliated: true, deptId: 'abc', reviewer: 'H', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 2, instituteId: 'Helium', affiliated: true, deptId: 'abc', reviewer: 'He', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 3, instituteId: 'Lithium', affiliated: true, deptId: 'abc', reviewer: 'Li', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 4, instituteId: 'Beryllium', affiliated: true, deptId: 'UK', reviewer: 'Be', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 5, instituteId: 'Boron', affiliated: true, deptId: 'abc', reviewer: 'B', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 6, instituteId: 'Carbon', affiliated: true, deptId: 'abc', reviewer: 'C', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 7, instituteId: 'Nitrogen', affiliated: true, deptId: 'abc', reviewer: 'N', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 8, instituteId: 'Oxygen', affiliated: true, deptId: 'abc', reviewer: 'O', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 9, instituteId: 'Fluorine', affiliated: true, deptId: 'abc', reviewer: 'F', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
	{position: 10, instituteId: 'Neon', affiliated: true, deptId: 'abc', reviewer: 'Ne', authorityTitle: 'q', name: 'xyz', email: 'sush.p@gmail.com', phone: 7428374848},
];