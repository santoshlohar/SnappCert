import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { AffInstitute } from '../../modals/aff-institute';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aff-institute-list',
  templateUrl: './aff-institute-list.component.html',
  styleUrls: ['./aff-institute-list.component.css']
})
export class AffInstituteListComponent implements OnInit {

	url;
	
	affInstData: AffInstitute[] = [];
	displayedColumns = ['instituteId', 'deptId', 'affInstId', 'affInstName', 'affInsLocation', 'status', 'id'];
	activated;
	dataSource = new MatTableDataSource<AffInstitute>(this.affInstData);
	selection = new SelectionModel<AffInstitute>(true, []);

	instituteIdFilter = new FormControl();
	departmentIdFilter = new FormControl();
	affInstIdFilter = new FormControl();
	affInstNameFilter = new FormControl();
	affInstLocFilter = new FormControl();
	affInstStatusFilter = new FormControl();

	filteredValues = {
		Institution_ID: '',
		department_ID: '',
		AfflInstitution_ID: '',
		afflInstitute_Name: '',
		afflInstitute_loc: '',
		status: ''
	}

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getAffInstitutes();
		this.filterByColumn();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	filterByColumn() {
		this.instituteIdFilter.valueChanges.subscribe((instituteIdFilterValue) => {
			this.filteredValues['Institution_ID'] = instituteIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.departmentIdFilter.valueChanges.subscribe((departmentIdFilterValue) => {
			this.filteredValues['department_ID'] = departmentIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstIdFilter.valueChanges.subscribe((affInstIdFilterValue) => {
			this.filteredValues['AfflInstitution_ID'] = affInstIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstNameFilter.valueChanges.subscribe((affInstNameFilterValue) => {
			this.filteredValues['afflInstitute_Name'] = affInstNameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstLocFilter.valueChanges.subscribe((affInstLocFilterValue) => {
			this.filteredValues['afflInstitute_loc'] = affInstLocFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstStatusFilter.valueChanges.subscribe((affInstStatusFilterValue) => {
			this.filteredValues['status'] = affInstStatusFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.dataSource.filterPredicate = this.customFilterPredicate();
	}

	customFilterPredicate() {
		const myFilterPredicate = function(data:AffInstitute, filter: string): boolean {
			let searchString = JSON.parse(filter);
			return data.Institution_ID.toString().trim().toLowerCase().indexOf(searchString.Institution_ID) !== -1
			&& data.department_ID.toString().trim().toLowerCase().indexOf(searchString.department_ID) !== -1
			&& data.AfflInstitution_ID.toString().trim().toLowerCase().indexOf(searchString.AfflInstitution_ID) !== -1
			&& data.afflInstitute_Name.toString().trim().toLowerCase().indexOf(searchString.afflInstitute_Name) !== -1
			&& data.afflInstitute_loc.toString().trim().toLowerCase().indexOf(searchString.afflInstitute_loc) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}

	getAffInstitutes() {
		this.url = '/afflInstitutes/';
		this.apiService.get(this.url)
			.subscribe((response:any) => {
				console.log(response);
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
					alert("");
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

}
