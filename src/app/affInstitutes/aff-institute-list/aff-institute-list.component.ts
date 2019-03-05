import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { AffInstitute } from '../../modals/aff-institute';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aff-institute-list',
  templateUrl: './aff-institute-list.component.html',
  styleUrls: ['./aff-institute-list.component.css']
})
export class AffInstituteListComponent implements OnInit {

	url;
	
	affInstData: AffInstitute[] = [];
	displayedColumns = ['instituteId', 'deptId', 'affInstId', 'affInsLocation', 'status', 'id'];
	activated;
	dataSource = new MatTableDataSource<AffInstitute>(this.affInstData);
	selection = new SelectionModel<AffInstitute>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getAffInstitutes();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getAffInstitutes() {
		this.url = '/afflInstitutes/';

		this.apiService.get(this.url)
			.subscribe((response:any) => {
				console.log(response)
				if(response.message == "success") {
					this.affInstData = response.data;
					for(var i = 0; i < this.affInstData.length; i++) {
						if(this.affInstData[i].status == "Active") {
							this.affInstData[i].activated = 'Inactive';
						}
						if(this.affInstData[i].status == "Inactive") {
							this.affInstData[i].activated = 'Active';
						}
						this.dataSource.data = this.affInstData;
					}
				} else {
					alert("asda");
				}
			});
	};

	activate(data) {
		var affInstId = data._id;
		this.url = "/afflInstitutes/";
		this.apiService.put(this.url + affInstId, data)
			.subscribe((response) => {
				this.getAffInstitutes();
			});
	}

	// updateAffIns(row) {
	// 	console.log(row);
	// 	this.url = '/afflInstitutes/';
	// 	this.apiService.put(this.url+ row._id, row)
	// 		.subscribe((response) => {
	// 			console.log(response);
	// 		});
	// }

	// activate(data) {
	// 	console.log('data' + JSON.stringify(data));
	// 	var affInstId = data._id;
	// 	this.url = '/afflInstitutes/';
	// 	this.apiService.put(this.url + affInstId, data)
	// 		.subscribe((response) => {
	// 			this.getAffInstitutes();
	// 		});
	// }


}
