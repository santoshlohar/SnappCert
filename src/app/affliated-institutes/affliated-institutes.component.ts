import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
declare var $;

@Component({
    selector: 'app-affliated-institutes',
    templateUrl: './affliated-institutes.component.html',
    styleUrls: ['./affliated-institutes.component.css']
})

export class AffliatedInstitutesComponent implements OnInit {

	displayedColumns = ['select', 'position', 'instituteId', 'affiliatedInstitute', 'affInsName', 'affInsLocation', 'deptId', 'dm1Name', 'dm1Email', 'dm1Phn'];
	dataSource = new MatTableDataSource<AffInstitutes>(ELEMENT_DATA);
	selection = new SelectionModel<AffInstitutes>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor() { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		console.log(this.selection.selected);
		return numSelected === numRows;
	}

	masterToggle() {
		console.log(this.selection);
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

};

export interface AffInstitutes {
	instituteId: string;
	position: number;
	affiliatedInstitute: string;
	affInsName: string;
	affInsLocation: string;
	deptId: number;
	dm1Name: string;
	dm1Email: string;
	dm1Phn: number;
}

const ELEMENT_DATA: AffInstitutes[] = [
	{position: 1, instituteId: 'Hydrogen', affiliatedInstitute: 'abc', affInsName: 'H', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 2, instituteId: 'Helium', affiliatedInstitute: 'abc', affInsName: 'He', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 3, instituteId: 'Lithium', affiliatedInstitute: 'abc', affInsName: 'Li', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 4, instituteId: 'Beryllium', affiliatedInstitute: 'UK', affInsName: 'Be', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 5, instituteId: 'Boron', affiliatedInstitute: 'abc', affInsName: 'B', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 6, instituteId: 'Carbon', affiliatedInstitute: 'abc', affInsName: 'C', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 7, instituteId: 'Nitrogen', affiliatedInstitute: 'abc', affInsName: 'N', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 8, instituteId: 'Oxygen', affiliatedInstitute: 'abc', affInsName: 'O', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 9, instituteId: 'Fluorine', affiliatedInstitute: 'abc', affInsName: 'F', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
	{position: 10, instituteId: 'Neon', affiliatedInstitute: 'abc', affInsName: 'Ne', affInsLocation: 'q', deptId: 1, dm1Name: 'xyz', dm1Email: 'sush.p@gmail.com', dm1Phn: 7428374848},
];
