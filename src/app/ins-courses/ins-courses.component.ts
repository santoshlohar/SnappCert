import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../Services/api.service';
import { InstitutesCourse } from '../model/institutes-courses';

@Component({
	selector: 'app-ins-courses',
	templateUrl: './ins-courses.component.html',
	styleUrls: ['./ins-courses.component.css']
})
export class InsCoursesComponent implements OnInit {
	displayedColumns = [
		'instituteId',
		'deptId', 
		'courseType', 
		'courseId', 
		'courseName', 
		'specialization', 
		'courseDuration',
		'durationUnit',
		'termType',
		'noOfTerms',
		'_id'
	];

	dataSource = new MatTableDataSource<InstitutesCourse>(ELEMENT_DATA);
	selection = new SelectionModel<InstitutesCourse>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService) { }

	ngOnInit() {
	}

};

const ELEMENT_DATA: InstitutesCourse[] = [
	{instituteId: '1', deptId: '1',courseType: 'semester',courseId:'001',courseName:'B.tech',specialization:'dhdfj',courseDuration:'4years',durationUnit:'4', termType:'semester',noOfTerms: 8,_id: 1 }
]

