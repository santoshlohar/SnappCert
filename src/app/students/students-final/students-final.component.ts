import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { map } from 'rxjs/operators';
import { StudentDataService } from '../student-data.service';

@Component({
	selector: 'app-students-final',
	templateUrl: './students-final.component.html',
	styleUrls: ['./students-final.component.css']
})
export class StudentsFinalComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	url;
	students;
	id;
	selectedStudents: any = [];

	reviewerColumns = [
		'actions',
		'batchId', 
		'code', 
		'name', 
		'father',
		'dob',
		'aadhar',
		'email',
		'phoneNumber',
		'date',
		'status'
	];
	displayedColumns = [
		'batchId', 
		'code', 
		'name', 
		'father',
		'dob',
		'aadhar',
		'email',
		'phoneNumber',
		'date',
		'status'
	];

	batchIdFilter = new FormControl();
	studentIdFilter = new FormControl();
	nameFilter = new FormControl();
	fatherNameFilter = new FormControl();
	dobFilter = new FormControl();
	aadharFilter = new FormControl();
	emailFilter = new FormControl();
	phoneNumberFilter = new FormControl();
	dateFilter = new FormControl();
	statusFilter = new FormControl();

	filteredValues = {
		batchId: '',
		code: '',
		name: '',
		father: '',
		dob: '',
		aadhar: '',
		email: '',
		phoneNumber: '',
		date: '',
		status: ''
	}

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private route: ActivatedRoute,
				private router: Router,
				public confirmDialogService: ConfirmDialogService,
				public studentdataService: StudentDataService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.id = this.route.snapshot.params['batchId'];
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.getStudents();
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ? 
			this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	}

	getStudents() {
		this.url = "/student/list";

		var params = new HttpParams();
		params = params.append('skip', '0');
		params = params.append('limit', '10');
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);

		if(this.loggedInUser.reference.affiliateId === '111111111111111111111111') {
			params = params.append('affiliateId', this.id);
		} else {
			params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);
			params = params.append('batchId', this.id);
		}

		let that = this;

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					if(response.data.students.length) {
						that.students = response.data.students;
						this.dataSource.data = response.data.students;
					}
				}
			});
	};

	openDialog(row, status) {
		var data = {
			url: this.url = "/student/" + row._id +"/changeStatus",
			status: status,
			message: ''
		};
		if(status == 'reviewed') {
			data.message = "Are you sure you want to change status to reviewed?";
		} else if(status == 'rejected') {
			data.message = "Are you sure you want to change status to rejected?";
		}

		this.confirmDialogService.openDialog(data);
	};

};

const data = [{
	batch: {
		code: 'BI001'
	},
	code: "SI001",
	name: "Sushmita",
	father: "Mr. N S Pundir",
	dob: "03/11/1993",
	aadhar: "123412341234",
	email: "sush@gmail.com",
	phoneNumber: "8433892503",
	date: "21/05/2019",
	status: "Active",
	_id: "5ce29b10123b421338930a45"
}]
