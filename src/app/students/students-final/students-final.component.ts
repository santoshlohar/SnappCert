import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-students-final',
	templateUrl: './students-final.component.html',
	styleUrls: ['./students-final.component.css']
})
export class StudentsFinalComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	student;
	selectedStudents: any = [];
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

	dataSource = new MatTableDataSource<any>(data);
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
	}

}


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
	status: "Active"
}]
