import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { InstituteCourse } from '../../modals/institute-course';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { FormControl } from '@angular/forms';

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

	instituteIdFilter = new FormControl();
	deptIdFilter = new FormControl();
	courseTypeFilter = new FormControl();
	courseIdFilter = new FormControl();
	courseNameFilter = new FormControl();
	specFilter = new FormControl();
	durationFilter = new FormControl();
	unitFilter = new FormControl();
	termTypeFilter = new FormControl();
	termNoFilter = new FormControl();
	statusFilter = new FormControl();

	filteredValues = {
		instituteID: '',
		department_ID: '',
		Course_Type: '',
		Course_ID: '',
		Course_Name: '',
		Specialization: '',
		Course_Duration: '',
		Duration_Unit: '',
		Term_Type: '',
		No_of_Terms: '',
		status: ''
	}

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
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.filterByColumn();
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

	activate(data) {
		var affInstId = data._id;
		this.url = '/course/';
		this.apiService.put(this.url + affInstId, data)
			.subscribe((response) => {
				this.getCoursesByInsId();
			});
	}

	// activate(row) {
	// 	this.url = '/course/';
	// 	if(row.isActivated == true) {
	// 		row.isActivated = false;
	// 		row.activated = "Activate";
	// 	} else if(row.isActivated == false) {
	// 		row.isActivated = true;
	// 		row.activated = "Deactivate";
	// 	}
	// 	this.course = row;
	// 	this.apiService.put(this.url+ row._id, this.course)
	// 		.subscribe((response) => {
	// 			this.getCoursesByInsId();
	// 		});
	// }

	selectCourses() {
		var selectedCourse = this.selection.selected;
		if(selectedCourse.length) {
			for(var i=0;i<selectedCourse.length;i++) {
				selectedCourse[i].Affliated_Institute_ID = this.loginUser.Affliated_Institute_ID;
			};
			this.url = "/afflinstitute/courses";		   
			this.apiService.post(this.url, selectedCourse)
				.subscribe((response: any) => {
					if(response.message == 'success') {
						alert("Selected courses link with your institute successfully!")
					}
				},
				(error) => {
					console.log(error);
				});
		} else {
			alert("Please select the courses you want to link with your Affiliated Institute.")
		}
	}

	// getCoursesByAffIns() {
	// 	this.url = "/coursesbyafflinstid/";
	// 	this.apiService.get(this.url + this.aff_inst_Id)
	// 		.subscribe((response) => {
	// 			console.log(response);
	// 			//this.dataSource.data = response.data;
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		})
	// }

	viewSelectCourses() {
		this.url = "/coursesbyafflinstid/";
		this.apiService.get(this.url+ this.aff_inst_Id)
			.subscribe((response) => {
				if(response.message == 'success') {
					if(response.data){
						this.courses = response.data.afflCourses;
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
						alert("No courses found for your Affiliated Institute!")
					}
				}
			},
			(error) => {
				console.log(error)
			})
	}

	filterByColumn() {

		this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
			this.filteredValues['instituteID'] = instituteIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.deptIdFilter.valueChanges.subscribe((deptIdFilterValue) => {
			this.filteredValues['department_ID'] = deptIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.courseTypeFilter.valueChanges.subscribe((courseTypeFilterValue) => {
			this.filteredValues['Course_Type'] = courseTypeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.courseIdFilter.valueChanges.subscribe((courseIdFilterValue) => {
			this.filteredValues['Course_ID'] = courseIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});
		
		this.courseNameFilter.valueChanges.subscribe((courseNameFilterValue) => {
			this.filteredValues['Course_Name'] = courseNameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.specFilter.valueChanges.subscribe((specFilterValue) => {
			this.filteredValues['Specialization'] = specFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.durationFilter.valueChanges.subscribe((durationFilterValue) => {
			this.filteredValues['Course_Duration'] = durationFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.unitFilter.valueChanges.subscribe((unitFilterValue) => {
			this.filteredValues['Duration_Unit'] = unitFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.termTypeFilter.valueChanges.subscribe((termTypeFilterValue) => {
			this.filteredValues['Term_Type'] = termTypeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.termNoFilter.valueChanges.subscribe((termNoFilterValue) => {
			this.filteredValues['No_of_Terms'] = termNoFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.statusFilter.valueChanges.subscribe((statusFilterValue) => {
			this.filteredValues['status'] = statusFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.dataSource.filterPredicate = this.customFilterPredicate();
	}

	customFilterPredicate() {
		const myFilterPredicate = function(data:InstituteCourse, filter: string): boolean {
			let searchString = JSON.parse(filter);
			return data.instituteID.toString().trim().toLowerCase().indexOf(searchString.instituteID) !== -1
			&& data.department_ID.toString().trim().toLowerCase().indexOf(searchString.department_ID) !== -1
			&& data.Course_Type.toString().trim().toLowerCase().indexOf(searchString.Course_Type) !== -1
			&& data.Course_ID.toString().trim().toLowerCase().indexOf(searchString.Course_ID) !== -1
			&& data.Course_Name.toString().trim().toLowerCase().indexOf(searchString.Course_Name) !== -1
			&& data.Specialization.toString().trim().toLowerCase().indexOf(searchString.Specialization) !== -1
			&& data.Course_Duration.toString().trim().toLowerCase().indexOf(searchString.Course_Duration) !== -1
			&& data.Duration_Unit.toString().trim().toLowerCase().indexOf(searchString.Duration_Unit) !== -1
			&& data.Term_Type.toString().trim().toLowerCase().indexOf(searchString.Term_Type) !== -1
			&& data.No_of_Terms.toString().trim().toLowerCase().indexOf(searchString.No_of_Terms) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}


}