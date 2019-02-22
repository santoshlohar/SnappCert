import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-batch-upload-list',
  templateUrl: './batch-upload-list.component.html',
  styleUrls: ['./batch-upload-list.component.css']
})
export class BatchUploadListComponent implements OnInit {

	url;
	loginUser;
	authUsers: [] = [];
	uploadedFileName;
	batchesData = [];
	newBatches = [];
	selectedBatches = [];
	errorBatches = [];
	displayedColumns = [
		'select',
		'actions',
		'instituteId', 
		'affiliated', 
		'courseId', 
		'batchId', 
		'batchYear', 
		'minCredits', 
		'minCgpa',
		'totalCgpa',
		'minScore',
		'totalScore',
		'termType',
		'termId',
		'termStart',
		'termEnd',
		'transactionStatus',
		'failure',
		'comments',
		'transactionMachine',
		'date',
		'time',
		'userName',
		'_id'
	];

	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		//this.dataSource.data = Batch_Data;
		//console.log(this.dataSource.data);
		this.getTempBatch();
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

	uploadBatch(files, filename) {
		var form = new FormData();
		form.append(filename, files[0]);

		this.url = '/batchdata/fileupload';
		this.apiService.post(this.url, form)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			});
	}

	getTempBatch(){
		this.url = '/temp/batchdata';

		this.apiService.get(this.url)
			.subscribe((response) => {
				if(response.message == 'success') {
					console.log(response.data);
					this.batchesData = response.data;
					for(var i=0; i<this.batchesData.length; i++) {
						this.batchesData[i].position = i;
						this.batchesData[i].editing = false;
					
						if(this.batchesData[i].transactionStatus == 'New') {
							
							if(isNaN(this.batchesData[i].minCredits)) {
								this.batchesData[i].minCreditsErr = true;
							}

							if(isNaN(this.batchesData[i].minCGPA)) {
								this.batchesData[i].minCGPAErr = true;
							}

							if(isNaN(this.batchesData[i].totalCGPA)) {
								this.batchesData[i].totalCGPAErr = true;
							}

							if(isNaN(this.batchesData[i].minScore)) {
								this.batchesData[i].minScoreErr = true;
							}
							
							this.newBatches.push(this.batchesData[i]);
							this.dataSource.data = this.newBatches;
						}							
					}
				}
			},
			(error) => {
				console.log(error);
				if(error) {
					var errMessage = error.error.message;
					alert(errMessage);
				}
			})
	}

	edit(row) {
		var tableData = this.newBatches;
		for(var i=0;i<tableData.length;i++) {
			if(row._id == tableData[i]._id) {
				if(tableData[i].editing == false) {
					tableData[i].editing = true;
				} else {
					tableData[i].editing = false;
				}

				if(tableData[i].minCreditsErr == true) {
					if(String(tableData[i].minCredits)) {
						tableData[i].minCredits = Number(tableData[i].minCredits);
						tableData[i].minCreditsErr = false;
					}
				} else {
					if(isNaN(tableData[i].minCredits)) {
						tableData[i].minCreditsErr = true;
					}
				}

				if(tableData[i].minCGPAErr == true) {
					if(String(tableData[i].minCGPA)) {
						tableData[i].minCGPA = Number(tableData[i].minCGPA);
						tableData[i].minCGPAErr = false;
					}
				} else {
					if(isNaN(tableData[i].minCGPA)) {
						tableData[i].minCGPAErr = true;
					}
				}

				if(tableData[i].totalCGPAErr == true) {
					if(String(tableData[i].totalCGPA)) {
						tableData[i].totalCGPA = Number(tableData[i].totalCGPA);
						tableData[i].totalCGPAErr = false;
					}
				} else {
					if(isNaN(tableData[i].totalCGPA)) {
						tableData[i].totalCGPAErr = true;
					}
				}

				if(tableData[i].minScoreErr == true) {
					if(String(tableData[i].minScore)) {
						tableData[i].minScore = Number(tableData[i].minScore);
						tableData[i].minScoreErr = false;
					}
				} else {
					if(isNaN(tableData[i].minScore)) {
						tableData[i].minScoreErr = true;
					}
				}

				if(tableData[i].totalScoreErr == true) {
					if(String(tableData[i].totalScore)) {
						tableData[i].totalScore = Number(tableData[i].totalScore);
						tableData[i].totalScoreErr = false;
					}
				} else {
					if(isNaN(tableData[i].totalScore)) {
						tableData[i].totalScoreErr = true;
					}
				}
				
				this.dataSource.data = tableData;			
			}
		}
	}

	processData() {
		console.log("process");
		this.selectedBatches = this.selection.selected;

		this.url = "/updatemultibatchdata";
		if(this.selectedBatches.length) {
			for(var i=0;i<this.selectedBatches.length;i++){
				var singleBatch = this.selectedBatches[i];
				console.log(singleBatch);
				if(!singleBatch.instituteID || !singleBatch.afflInstituteID || !singleBatch.courseID ||
				   !singleBatch.batchID || !singleBatch.batchYear || !singleBatch.minCredits || singleBatch.minCreditsErr ||
				   !singleBatch.minCGPA || singleBatch.minCGPAErr || !singleBatch.totalCGPA || singleBatch.totalCGPAErr ||
				   !singleBatch.minScore || singleBatch.minScoreErr || !singleBatch.totalScore || singleBatch.totalScoreErr ||
				   !singleBatch.termType || !singleBatch.termID || !singleBatch.termStartMonth || !singleBatch.termEndMonth ||
				   !singleBatch.termEndMonth ) {

					alert("Please deselect error batch before process the data!");
				} else {
					this.apiService.post(this.url, this.selectedBatches)
						.subscribe((response: any) => {
							console.log(response);
							if(response.message == 'success') {
								alert("Your data processed successfully...");
							}
						},
						(error) => {
							console.log(error);
							var message = error.error.message;
							alert(message);
						})
				}
			}
		} else {
			alert("please select atleast one batch data to process!")
		}
	}

	deleteBatches() {
		console.log("delete");
		this.selectedBatches = this.selection.selected;

		this.url = "/deletempbatchdata";
		if(this.selectedBatches.length) {
			this.apiService.post(this.url, this.selectedBatches)
				.subscribe((response) => {
					console.log(response)
				},
				(error) => {
					console.log(error);
				})
		} else {
			alert("please select atleast one batch data to delete!");
		}
	}

}
