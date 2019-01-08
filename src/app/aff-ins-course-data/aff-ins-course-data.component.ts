import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
	selector: 'app-aff-ins-course-data',
	templateUrl: './aff-ins-course-data.component.html',
	styleUrls: ['./aff-ins-course-data.component.css']
})
export class AffInsCourseDataComponent implements OnInit {
	displayedColumns = [
		'position', 
		'instituteId', 
		'affiliatedIns', 
		'deptId', 
		'courseType', 
		'courseId', 
		'courseName', 
		'specialization', 
		'certificate',
		'certificatePrint',
		'gpaCalculate',
		'subCredits',
		'courseDuration',
		'durationUnit',
		'termType',
		'noOfTerms'
	];
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
	position: number;
	instituteId: string;
	affiliatedIns: boolean;
	deptId: string;
	courseType: string;
	courseId: string;
	courseName: string;
	specialization: string;
	certificate: string;
	certificatePrint: boolean;
	gpaCalculate: boolean;
	subCredits: string;
	courseDuration: number;
	durationUnit: string;
	termType: string;
	noOfTerms: number;
}

const ELEMENT_DATA: AffInstitutes[] = [
	{position: 1, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 2, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 3, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 4, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 5, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 6, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 7, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 8, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 9, instituteId: 'Hydrogen', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 },
	{position: 10, instituteId: '132', affiliatedIns: true, deptId: 'abc', courseType: 'H', courseId: 'q', courseName: 'xyz', specialization: 'sush.p@gmail.com', certificate: 'a',certificatePrint: true, gpaCalculate:true, subCredits: 'aaa', courseDuration: 4, durationUnit: '2', termType: 'fdfds', noOfTerms: 2 }
	
];
