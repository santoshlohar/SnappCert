import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-uploaded',
  templateUrl: './students-uploaded.component.html',
  styleUrls: ['./students-uploaded.component.css']
})
export class StudentsUploadedComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	student;
	selectedStudents: any = [];
	displayedColumns = [
		'select',
		'batchId', 
		'code', 
		'name', 
		'father',
		'dob',
		'aadhar',
		'email',
		'phoneNumber',
		'date',
		'status',
		'_id'
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
	constructor(private router: Router,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
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

	goToFinal() {
		this.selectedStudents = this.selection.selected;
		
		if(this.selectedStudents.length < 1) {
			var data = {
				reason: "Please select atleast one student to process!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.student = this.selectedStudents[0];
			this.router.navigate(['/'+ this.student._id + '/uploadedCertificates']);
		}
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
	status: "Active",
	_id: "5ce29b10123b421338930a45"
}]
