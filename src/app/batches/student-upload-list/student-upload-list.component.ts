import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-upload-list',
  templateUrl: './student-upload-list.component.html',
  styleUrls: ['./student-upload-list.component.css']
})
export class StudentUploadListComponent implements OnInit {

	displayedColumns = [
		'select',
		'actions', 
		'batchId', 
		'studentId', 
		'name', 
		'fatherName',
		'dob',
		'aadhaar',
		'emailId',
		'mobile',
		'specialization',
		'transactionStatus',
		'failure',
		'transactionMachine',
		'transactiondate',
		'transactiontime',
		'transactionUser'
	];
	url;
	loginUser;
	userType;
	studentData = [];
	newStudents = [];
	selectedStudents = [];
	reviewers;
	approvers;
	params = {};
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.getTempStudents();
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

	uploadstudent(files, filename) {
		var form = new FormData();
		form.append(filename, files[0]);

		this.url = '/studentdet/fileupload';
		this.apiService.post(this.url, form)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			});
	}

	getTempStudents() {
		this.url = "/temp/studentdet";
		var params = ''
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				console.log(response)
				if(response.message == 'success') {
					this.studentData = response.data;
					for(var i=0; i<this.studentData.length; i++) {
						this.studentData[i].position = i;
						this.studentData[i].editing = false;

						if(this.studentData[i].transactionStatus == 'New') {

							if(isNaN(this.studentData[i].aadhaarNoLoginID)) {
								this.studentData[i].aadhaarNoErr = true;
							}

							if(isNaN(this.studentData[i].mobile)) {
								this.studentData[i].mobileNoErr = true;
							}

							this.newStudents.push(this.studentData[i]);
							this.dataSource.data = this.newStudents;
						}
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	deleteStudents() {
		this.selectedStudents = this.selection.selected;
		this.url = "/deletetempstudentdet";
		if(this.selectedStudents.length) {
			this.apiService.post(this.url, this.selectedStudents)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			})
		} else {
			alert("please select atleast one student data to delete!");
		}
		
	}

	processData() {
		this.selectedStudents = this.selection.selected;

		this.url = "/updatemultistudentdet";
		if(this.selectedStudents.length) {
			for(var i=0;i<this.selectedStudents.length;i++) {
				var student = this.selectedStudents[i];
				if( !student.batchID || !student.studentID || !student.name ||
					!student.fatherName || !student.dob || !student.aadhaarNoLoginID ||
					student.aadhaarNoErr || !student.emailID || !student.mobile || 
					student.mobileNoErr ||!student.specialization  ) {
						alert("Please deselect error student before process the data!");
				} else {
					this.apiService.post(this.url, this.selectedStudents)
						.subscribe((response: any) => {
							if(response.message == 'success') {
								alert("Your data processed successfully...");

							}
						},
						(error) => {
							console.log(error);
						});
				}
			}
		} else {
			alert("please select atleast one student data to process!")
		}
	}

	edit(row) {
		var tableData = this.newStudents;
		for(var i=0;i<tableData.length;i++) {
			if(row._id == tableData[i]._id) {
				if(tableData[i].editing == false) {
					tableData[i].editing = true;
				} else {
					tableData[i].editing = false;
				}

				if(tableData[i].aadhaarNoErr == true) {
					if(String(tableData[i].aadhaarNoLoginID)) {
						tableData[i].aadhaarNoLoginID = Number(tableData[i].aadhaarNoLoginID);
						tableData[i].aadhaarNoErr = false;
					}
				} else {
					if(isNaN(tableData[i].aadhaarNoLoginID)) {
						tableData[i].aadhaarNoErr = true;
					}
				}
				
				if(tableData[i].mobileNoErr == true) {
					if(String(tableData[i].mobile)) {
						tableData[i].mobile = Number(tableData[i].mobile);
						tableData[i].mobileNoErr = false;
					}
				} else {
					if(isNaN(tableData[i].mobile)) {
						tableData[i].mobileNoErr = true;
					}
				}

				this.dataSource.data = tableData;
			}
		}
	}

	getReviewersList() {
		this.url = "/searchUsers";		
		this.params = {
			UserType: "INST_REVIEWER",
			Affliated_Institute_ID: this.loginUser.Affliated_Institute_ID
		}
		this.apiService.post(this.url, this.params)
			.subscribe((response: any) => {
				if(response.message == 'success') {
					if(response.data) {
						this.reviewers = response.data;
						localStorage.setItem('reviewers', JSON.stringify(this.reviewers));
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	getApproversList() {
		this.url = "/searchUsers";		
		this.params = {
			UserType: "DATA_APPROVER",
			Affliated_Institute_ID: this.loginUser.Affliated_Institute_ID
		}
		this.apiService.post(this.url, this.params)
			.subscribe((response: any) => {
				if(response.message == 'success') {
					if(response.data) {
						this.approvers = response.data;
						localStorage.setItem('approvers', JSON.stringify(this.approvers));
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	goToFinalTable() {
		this.selectedStudents = this.selection.selected;
		this.url = '/pushstudentdettemp2final';

		if(this.selectedStudents.length) {
			for(var i=0;i<this.selectedStudents.length;i++) {
				this.selectedStudents[i].reviewers = [];
				for(var j=0;j<this.reviewers.length;j++) {
					this.selectedStudents[i].reviewers.push(this.reviewers[j]);
				}
				this.selectedStudents[i].certifiers = [];
				for(var k=0;k<this.approvers.length;k++) {
					this.selectedStudents[i].certifiers.push(this.approvers[k]);
				}

				console.log(this.selectedStudents)
				this.apiService.post(this.url, this.selectedStudents)
					.subscribe((response) => {
						console.log(response);
					},
					(error)=> {
						console.log(error)
					}
				);
			}
		} else {
			alert("please select atleast one certificate data to delete!");
		}
	}
}


