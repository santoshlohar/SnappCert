import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { InstituteCourse } from 'src/app/modals/institute-course';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-courses-my',
	templateUrl: './courses-my.component.html',
	styleUrls: ['./courses-my.component.css']
})
export class CoursesMyComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	affiliateId;
	url;
	courses;
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

	dataSource = new MatTableDataSource<InstituteCourse>();
	selection = new SelectionModel<InstituteCourse>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.affiliateId = this.loggedInUser.reference.affiliateId;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.myCourses();
		this.filterByColumn();
	}

	myCourses() {
		this.url = "/course/affiliateCourses";
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);

		this.apiService.get(this.url, params)
			.subscribe((response) => {
				if(response.success == true) {
					this.courses = response.data;
					for(var i=0;i<this.courses.length;i++) {
						if(this.courses[i].affiliateReferenceIsActive == true) {
							this.courses[i].status = "Active";
						} else {
							this.courses[i].status = "Inactive";
						}
					}
					this.dataSource.data = this.courses;
				}
			})
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

	changeStatus(row) {
		var courseId = row.affiliateReferenceId;
		this.url = "/course/affiliate/"+ courseId +"/changeStatus";
		var data = {
			affiliateReferenceIsActive: row.affiliateReferenceIsActive
		};
		if(row.affiliateReferenceIsActive == true) {
			data.affiliateReferenceIsActive = false;
		} else {
			data.affiliateReferenceIsActive = true;
		}

		this.apiService.put(this.url, data)
			.subscribe((response) => {
				if(response.success == true) {
					this.myCourses();
				}
			});
	}
}
