import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { InstituteCourse } from '../../modals/institute-course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

	url;
	courses: InstituteCourse[] = [];
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
		'status',
		'_id'
	];

	dataSource = new MatTableDataSource<InstituteCourse>(this.courses);
	selection = new SelectionModel<InstituteCourse>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.getInsCourses();
	}

	getInsCourses() {
		this.url = '/coursedata';

		this.apiService.get(this.url)
			.subscribe((response) => {
				console.log(response);
				this.courses = response;
				this.dataSource.data = this.courses;
			});
	}

	editCourse(row) {
		console.log(row);
		this.url = '/coursedata/';
		this.apiService.put(this.url+ row._id, row)
			.subscribe((response) => {
				console.log(response);
			})
	}
}