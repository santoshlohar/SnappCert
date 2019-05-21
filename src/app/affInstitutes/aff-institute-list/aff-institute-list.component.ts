import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { AffInstitute } from '../../modals/aff-institute';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ErrorDialogService } from 'src/app/services/error-dialog.service';

@Component({
  selector: 'app-aff-institute-list',
  templateUrl: './aff-institute-list.component.html',
  styleUrls: ['./aff-institute-list.component.css']
})
export class AffInstituteListComponent implements OnInit {

	url;
	loggedInUser;
	role;
	entity;
	departmentId;
	affiliate;
	selectedAffiliates: any = [];
	affInstData: AffInstitute[] = [];
	displayedColumns = ['select', 'deptId', 'affInstId', 'affInstName', 'affInsLocation', 'status', 'id'];
	activated;
	dataSource = new MatTableDataSource<AffInstitute>(this.affInstData);
	selection = new SelectionModel<AffInstitute>(true, []);

	departmentIdFilter = new FormControl();
	affInstIdFilter = new FormControl();
	affInstNameFilter = new FormControl();
	affInstLocFilter = new FormControl();
	affInstStatusFilter = new FormControl();

	filteredValues = {
		departmentId: '',
		affiliateId: '',
		name: '',
		address: '',
		status: ''
	}

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService,
				private router: Router,
				public errorDialogService: ErrorDialogService) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.getAffInstitutes(this.loggedInUser.reference.departmentId);
		this.filterByColumn();
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

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	filterByColumn() {
		this.departmentIdFilter.valueChanges.subscribe((departmentIdFilterValue) => {
			this.filteredValues['departmentId'] = departmentIdFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.affInstIdFilter.valueChanges.subscribe((affInstIdFilterValue) => {
			this.filteredValues['affiliateId'] = affInstIdFilterValue;
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
			&& data.code.toString().trim().toLowerCase().indexOf(searchString.affiliateId) !== -1
			&& data.name.toString().trim().toLowerCase().indexOf(searchString.name) !== -1
			&& data.address.toString().trim().toLowerCase().indexOf(searchString.address) !== -1
			&& data.status.toString().trim().toLowerCase().indexOf(searchString.status) !== -1
		}
		return myFilterPredicate;
	}

	getAffInstitutes(departmentId) {
		this.url = '/affiliate/list';
		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('skip', '0');
		params = params.append('limit', '10');

		if(departmentId !== "111111111111111111111111") {
			params = params.append('departmentId', departmentId);
		}

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
	}

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
					this.getAffInstitutes(this.loggedInUser.reference.departmentId);
				}
			});
	}

	getStudents() {
		this.selectedAffiliates = this.selection.selected;

		if(this.selectedAffiliates.length !== 1) {
			var data = {
				reason: "Please select one affiliate institute!",
				status: ''
			};
			this.errorDialogService.openDialog(data);
		} else {
			this.affiliate = this.selectedAffiliates[0];
			this.router.navigate(['/' + this.affiliate._id + '/students']);
		}
	}
}
