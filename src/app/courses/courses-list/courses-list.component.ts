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
		'actions',
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
		//this.getCoursesByAffIns();
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
				console.log(this.courses);
				for(var i=0;i<this.courses.length;i++) {
					if(this.courses[i].isActivated) {
						this.courses[i].activated = "Inactivate"
					} else {
						this.courses[i].activated = "Activate"
					}
					this.dataSource.data = this.courses;
				}
				
			});
	}

	getCoursesByInsId() {
		this.url = '/coursedatabyinstid/';

		this.apiService.get(this.url + this.inst_Id)
			.subscribe((response) => {
 				if(response.message == 'success') {
					if(response.data.length) {
						this.courses = response.data;
						for(var i=0;i<this.courses.length;i++) {
							this.course = this.courses[i];
							if(this.courses[i].isActivated) {
								this.courses[i].activated = "Deactivate";
							} else if(!this.courses[i].isActivated) {
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
		this.router.navigate(['/courseEdit/'+ row._id]);
	}

	activate(row) {
		this.url = '/course/';
		if(row.isActivated == true) {
			row.isActivated = false;
			row.activated = "Activate";
		} else if(row.isActivated == false) {
			row.isActivated = true;
			row.activated = "Deactivate";
		}
		this.course = row;
		this.apiService.put(this.url+ row._id, this.course)
			.subscribe((response) => {
				this.getCoursesByInsId();
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
				this.dataSource.data = response.data;
			},
			(error) => {
				console.log(error)
			})
	}

	viewSelectCourses() {
		this.url = "/coursesbyafflinstid/";

		this.apiService.get(this.url+ this.aff_inst_Id)
			.subscribe((response) => {
				console.log(response);
				if(response.message == 'success') {
					if(response.data){
						this.getCoursesByAffIns();
					} else {
						alert("No courses found for your Affiliated Institute!")
					}
				}
			},
			(error) => {
				console.log(error)
			})
	}
}