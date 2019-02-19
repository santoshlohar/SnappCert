import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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
	};

	masterToggle() {
		this.isAllSelected() ? 
			this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
	};

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
				// if(tableData[i].scrErnErr == true) {
				// 	if(isString(tableData[i].scoreEarned)) {
				// 		tableData[i].scoreEarned = Number(tableData[i].scoreEarned);
				// 		tableData[i].scrErnErr = false;
				// 	}
				// } else {
				// 	if(isNaN(tableData[i].scoreEarned)) {
				// 		tableData[i].scrErnErr = true;
				// 	}
				// }

				// if(tableData[i].totalScrErr == true) {
				// 	if(isString(tableData[i].totalScore)) {
				// 		tableData[i].totalScore = Number(tableData[i].totalScore);
				// 		tableData[i].totalScrErr = false;
				// 	}
				// } else {
				// 	if(isNaN(tableData[i].totalScore)) {
				// 		tableData[i].totalScrErr = true;
				// 	}
				// }

				// if(tableData[i].creditsError == true) {
				// 	if(isString(tableData[i].creditsEarned)) {
				// 		tableData[i].creditsEarned = Number(tableData[i].creditsEarned);
				// 		tableData[i].creditsError = false;
				// 	}
				// } else {
				// 	if(isNaN(tableData[i].creditsEarned)) {
				// 		tableData[i].creditsError = true;
				// 	}
				// }
				this.dataSource.data = tableData;			
			}
		}
	};

}

// const Batch_Data: any[] = [
// 	{
// 		instituteId: '111', 
// 		affiliated: '111', 
// 		courseId: '11', 
// 		batchId:'11', 
// 		batchYear:'11', 
// 		minCredits:'11', 
// 		minCgpa:'aaa',
// 		totalCgpa:'aa',
// 		minScore:'aa',
// 		totalScore:'aa',
// 		termType:'aa',
// 		termId: 'aa',
// 		termStart:'aa',
// 		termEnd:'aa',
// 		dataStatus:'aa',
// 		comments:'aa',
// 		date:'aa',
// 		time:'aa',
// 		userName:'aa',
// 		_id: 'aa'
// 	}
// ]
