import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Student } from 'src/app/modals/student';

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
	url;
	batchId;
	students: Student[] = [];
	newStudents: Student[] = [];
	selectedStudents: any = [];
	displayedColumns = [
		'select',
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

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router,
				private route: ActivatedRoute,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.batchId = this.route.snapshot.params['batchId'];
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		this.getUploadedStudents();
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

	getUploadedStudents() {
		this.url = "/student/draft/list";

		var params = new HttpParams();
		params = params.append('affiliateId', this.loggedInUser.reference.affiliateId);
		params = params.append('batchId', this.batchId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');
		
		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					if(response.data.drafts.length) {
						this.students = response.data.drafts;
						this.newStudents = [];
						for(var i=0; i<this.students.length; i++) {
							this.students[i].isEditing = false;
							this.students[i].index = i;
							this.newStudents.push(this.students[i]);
							this.dataSource.data = this.newStudents;
						}
					}
				}
			});
	};

	uploadstudent(files, name) {
		var form = new FormData();
		form.append('file', files[0], files[0].filename);
		form.append('affiliateId', this.loggedInUser.reference.affiliateId);
		form.append('batchId', this.batchId);

		this.url = "/student/draft/upload";
		this.apiService.upload(this.url, form)
			.subscribe((response: any) => {
				console.log(response);
			})
	}

	edit(row) {
		var i = row.index;
		var tableData = this.dataSource.data;
		if(tableData[i].isEditing == false) {
			tableData[i].isEditing = true;
		} else {
			tableData[i].isEditing = false;
		}
		this.dataSource.data = tableData;
	}

	save(row) {
		this.url = "/student/draft/"+ row._id;
		var i = row.index;

		this.apiService.put(this.url, row)
			.subscribe((response: any) => {
				if(response.success == true) {
					var tableData = this.dataSource.data;
					tableData[i].isEditing = false;
					setTimeout(() => {
						this.getUploadedStudents();
					}, 3000);
				}
			})
	}

	deleteDrafts() {
		this.selectedStudents = this.selection.selected;

		if(this.selectedStudents.length < 1) {
			var data = {
				reason: "Please select atleast one student to delete!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			var obj = {
				draftIds: [],
				affiliateId: this.loggedInUser.reference.affiliateId
			};

			for(var i=0; i<this.selectedStudents.length; i++){
				obj.draftIds.push(this.selectedStudents[i]._id);
			}
			this.url = "/student/draft/delete";
			this.apiService.post(this.url, obj)
				.subscribe((response: any) => {
					console.log(response);
					this.getUploadedStudents();
				})

		}
		
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
			var obj = {
				drafts: this.selectedStudents
			}

			this.url = "/student/draft/process";
			console.log(obj);
			this.apiService.put(this.url, obj)
				.subscribe((response: any) => {
					console.log(response);
					this.getUploadedStudents();
				})


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
