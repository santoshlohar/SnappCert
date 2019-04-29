import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { AffInstitute } from '../../modals/aff-institute';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-aff-institute-list',
  templateUrl: './aff-institute-list.component.html',
  styleUrls: ['./aff-institute-list.component.css']
})
export class AffInstituteListComponent implements OnInit {

	url;
	loggedInUser;
	affInstData: AffInstitute[] = [];
	displayedColumns = ['deptId', 'affInstName', 'affInsLocation', 'status', 'id'];
	activated;
	dataSource = new MatTableDataSource<AffInstitute>(this.affInstData);
	selection = new SelectionModel<AffInstitute>(true, []);

	departmentIdFilter = new FormControl();
	affInstNameFilter = new FormControl();
	affInstLocFilter = new FormControl();
	affInstStatusFilter = new FormControl();

	filteredValues = {
		departmentId: '',
		name: '',
		address: '',
		status: ''
	}

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.getAffInstitutes();
		this.filterByColumn();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	filterByColumn() {
		this.departmentIdFilter.valueChanges.subscribe((departmentIdFilterValue) => {
			this.filteredValues['departmentId'] = departmentIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstNameFilter.valueChanges.subscribe((affInstNameFilterValue) => {
			this.filteredValues['name'] = affInstNameFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstLocFilter.valueChanges.subscribe((affInstLocFilterValue) => {
			this.filteredValues['address'] = affInstLocFilterValue;
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
			return data.departmentId.toString().trim().toLowerCase().indexOf(searchString.departmentId) !== -1
			&& data.name.toString().trim().toLowerCase().indexOf(searchString.name) !== -1
			&& data.address.toString().trim().toLowerCase().indexOf(searchString.address) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}

	getAffInstitutes() {
		this.url = '/affiliate/list';
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.instituteId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.affInstData = response.data;
					for(var i=0;i<this.affInstData.length;i++) {
						if(this.affInstData[i].isActive == true) {
							this.affInstData[i].status = "Active";
						} else {
							this.affInstData[i].status = "Inactive";
						}
					}
					this.dataSource.data = this.affInstData;
				}
			});
	};

	changeStatus(row) {
		var affInstId = row._id;
		this.url = "/affiliate/"+ affInstId +"/changeStatus";
		var data = {
			isActive: row.isActive
		};

		if(row.isActive == true) {
			data.isActive = false;
		} else {
			data.isActive = true;
		}

		this.apiService.put(this.url, data)
			.subscribe((response) => {
				if(response.success == true) {
					this.getAffInstitutes();
				}
			});
	}
}
