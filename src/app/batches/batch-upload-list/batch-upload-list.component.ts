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
	displayedColumns = [
		'select',
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
					this.dataSource.data = response.data;
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
