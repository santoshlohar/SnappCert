import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { InstituteCourse } from '../../modals/institute-course';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

	url;
	loginUser;
	inst_Id;
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
	constructor(private apiService: ApiService,
				private router: Router,
				public globals: Globals) { 
					this.globals.stateRoute = this.router.url;
				}

	ngOnInit() {
		this.loginUser = JSON.stringify(localStorage.getItem('user'));
		this.inst_Id = this.loginUser.instituteID;
		if(this.loginUser.userType == 'INS_DATA_MANAGER') {
			this.getInsCourses();
		} else if (this.loginUser.userType == 'AFF_INS_DATA_MANAGER') {
			this.getCoursesByInsId();
		}
	}

	getInsCourses() {
		this.url = '/coursedata';

		this.apiService.get(this.url)
			.subscribe((response) => {
				this.courses = response;
				this.dataSource.data = this.courses;
			});
	}

	getCoursesByInsId() {
		this.url = '/coursedatabyinstid/';

		this.apiService.get(this.url + this.inst_Id)
			.subscribe((response) => {
				console.log(response);
				if(response.message == 'success') {
					if(response.data.length) {
						this.dataSource.data = response.data;
					} else {
						console.log("NO RECORD");
					}
				}
			},
			(error) => {
				console.log(error);
			})
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
