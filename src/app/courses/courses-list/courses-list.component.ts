import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { InstituteCourse } from '../../modals/institute-course';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

	url;
	loggedInUser;
	inst_Id;
	role;
	entity;
	affiliateId;
	courses = [];
	course: any = {};
	selectedCourses: any = [];
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

	dataSource = new MatTableDataSource<InstituteCourse>();
	selection = new SelectionModel<InstituteCourse>(true, []);

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
		instituteId: '',
		departmentId: '',
		type: '',
		code: '',
		name: '',
		specialization: '',
		duration: '',
		durationUnit: '',
		termType: '',
		noOfTerms: '',
		status: ''
	}

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router,
				public errorDialogService: ErrorDialogService) { 
				}

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		if(this.loggedInUser.reference.affiliateId) {
			this.affiliateId = this.loggedInUser.reference.affiliateId;
		}
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getCourses();
		this.filterByColumn();
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

	getCourses() {
		this.url = "/course/list";
		var params = new HttpParams();

		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					this.courses = response.data;
					for(var i=0;i<this.courses.length;i++) {
						if(this.courses[i].isActive == true) {
							this.courses[i].status = "Active";
						} else {
							this.courses[i].status = "Inactive";
						}
					}
					this.dataSource.data = this.courses;
				}
			})
	}

	changeStatus(row) {
		var courseId = row._id;
		this.url = "/course/"+ courseId +"/changeStatus";
		var data = {
			isActive: row.isActive
		};

		if(row.isActive == true) {
			data.isActive = false;
		} else {
			data.isActive = true;
		}

		this.apiService.put(this.url, data)
			.subscribe((response) => {
				if(response.success == true) {
					this.getCourses();
				}
			});
	}

	edit() {
		this.selectedCourses = this.selection.selected;
		
		if(this.selectedCourses.length !== 1) {
			var data = {
				reason: "Please select one course to edit!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.course = this.selectedCourses[0];
			this.router.navigate(['/courseEdit/'+ this.course._id]);
		}
	}

	saveAffiliateCourse() {
		this.selectedCourses = this.selection.selected;
		this.url = '/course/link/affiliates';

		if(this.selectedCourses.length < 1) {
			var obj = {
				reason: "Please select one course to save!",
				status: ''
			};
			this.errorDialogService.openDialog(obj);
		} else {
			var data = {
				courses: this.selectedCourses,
				affiliateId: this.affiliateId
			};
			this.apiService.post(this.url, data) 
				.subscribe((response: any) => {
					if(response.success == true) {
						this.getCourses();
					}
				});	
		}
	}

	myCourses() {
		this.url = "";

		var params = new HttpParams();

		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('affiliateId', this.affiliateId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					
				}
			});
	}

	filterByColumn() {

		this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
			this.filteredValues['instituteId'] = instituteIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.deptIdFilter.valueChanges.subscribe((deptIdFilterValue) => {
			this.filteredValues['departmentId'] = deptIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.courseTypeFilter.valueChanges.subscribe((courseTypeFilterValue) => {
			this.filteredValues['type'] = courseTypeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.courseIdFilter.valueChanges.subscribe((courseIdFilterValue) => {
			this.filteredValues['code'] = courseIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});
		
		this.courseNameFilter.valueChanges.subscribe((courseNameFilterValue) => {
			this.filteredValues['name'] = courseNameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.specFilter.valueChanges.subscribe((specFilterValue) => {
			this.filteredValues['specialization'] = specFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.durationFilter.valueChanges.subscribe((durationFilterValue) => {
			this.filteredValues['duration'] = durationFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.unitFilter.valueChanges.subscribe((unitFilterValue) => {
			this.filteredValues['durationUnit'] = unitFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.termTypeFilter.valueChanges.subscribe((termTypeFilterValue) => {
			this.filteredValues['termType'] = termTypeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.termNoFilter.valueChanges.subscribe((termNoFilterValue) => {
			this.filteredValues['noOfTerms'] = termNoFilterValue;
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
			return data.instituteId.toString().trim().toLowerCase().indexOf(searchString.instituteId) !== -1
			&& data.departmentId.toString().trim().toLowerCase().indexOf(searchString.departmentId) !== -1
			&& data.type.toString().trim().toLowerCase().indexOf(searchString.type) !== -1
			&& data.code.toString().trim().toLowerCase().indexOf(searchString.code) !== -1
			&& data.name.toString().trim().toLowerCase().indexOf(searchString.name) !== -1
			&& data.specialization.toString().trim().toLowerCase().indexOf(searchString.specialization) !== -1
			&& data.duration.toString().trim().toLowerCase().indexOf(searchString.duration) !== -1
			&& data.durationUnit.toString().trim().toLowerCase().indexOf(searchString.durationUnit) !== -1
			&& data.termType.toString().trim().toLowerCase().indexOf(searchString.termType) !== -1
			&& data.noOfTerms.toString().trim().toLowerCase().indexOf(searchString.noOfTerms) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}

}