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
	userType;
	aff_inst_Id;
	courses = [];
	course= {};
	singleCourse= {
		Course_ID : '',
		afflInstituteID: ''
	};
	affInstCourses: [] = [];
	displayedColumns = [
		'select',
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

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router) { 
				}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.inst_Id = this.loginUser.instituteID;
		if(this.loginUser.Affliated_Institute_ID) {
			this.aff_inst_Id = this.loginUser.Affliated_Institute_ID;
		}
		this.getCoursesByInsId();
		this.getCoursesByAffIns();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	};

	masterToggle() {
		this.isAllSelected() ? 
			this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	};

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
 				if(response.message == 'success') {
					if(response.data.length) {
						this.courses = response.data;
						console.log(this.courses)
						for(var i=0;i<this.courses.length;i++) {
							this.course = this.courses[i];
							if(this.courses[i].status == "Active") {
								this.courses[i].activated = "Deactivate";
							} else if(this.courses[i].status == "InActive") {
								this.courses[i].activated = "Activate";
							}
						}
						this.dataSource.data = this.courses;
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

	activate(row) {
		this.url = '/coursedata/';
		console.log(row);
		if(row.status == "Active") {
			row.status = "Inactive";
			row.activated = "Activate"
		} else if(row.status = "Inactive") {
			row.status = "Active";
			row.activated = "Deactivate";
		}
		this.course = row;
		console.log(this.course)
		this.apiService.put(this.url+ row._id, this.course)
			.subscribe((response) => {
				console.log(response);
			});
	}

	selectCourses() {
		var selectedCourse = this.selection.selected;
		this.url = "/afflinstitute/courses";
		for(var i=0;i<selectedCourse.length;i++) {
			selectedCourse[i].afflInstituteID = this.loginUser.Affliated_Institute_ID;
			break;
		};		   
		this.apiService.post(this.url, selectedCourse)
			.subscribe((response: any) => {
				console.log(response);
				if(response.message == 'success') {
					alert("Selected courses link with your institute successfully!")
				}
			},
			(error) => {
				console.log(error);
			});
	}

	getCoursesByAffIns() {
		this.url = "/coursesbyafflinstid/";
		this.apiService.get(this.url + this.aff_inst_Id)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error)
			})
	};
}