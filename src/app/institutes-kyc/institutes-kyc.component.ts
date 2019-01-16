import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../Services/api.service';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { InsKycDetails } from '../model/institutesKycDetails';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institutes-kyc',
  templateUrl: './institutes-kyc.component.html',
  styleUrls: ['./institutes-kyc.component.css']
})

export class InstitutesKycComponent implements OnInit {
	displayedColumns = [
	'instituteType', 
	'instituteId',
	'instituteName',
	'location',
	'state',
	'kycStatus',
	'kycAgentId',
	'academicHeadName',
	'_id'
	];
	statusChange = {
		"status": '',
		"createdBy" : '',
		"updateddBy" : ''
	}
	//ELEMENT_DATA: InsKycDetails[];
	approved: boolean = false; 
	institutes: InsKycDetails[];
	statusNew: boolean = false;
	newInstitutes: InsKycDetails[] = [];
	dataSource = new MatTableDataSource<InsKycDetails>(this.institutes);
	selection = new SelectionModel<InsKycDetails>(true, []);

	instituteTypeFilter = new FormControl();

	filteredValues = {instituteType: ''};

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private _formBuilder: FormBuilder,
		private apiService: ApiService,
		private router: Router) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getInstitutes();

		this.instituteTypeFilter.valueChanges.subscribe((instituteTypeFilterValue) => {
			this.filteredValues['instituteType'] = instituteTypeFilterValue;
			this.dataSource.filter = JSON.stringify(this.filteredValues);
		});

		this.dataSource.filterPredicate = this.customFilterPredicate();
	}

	// get new institutes details from institutesDetails table
	getInstitutes() {
		var getInsUrl = '/institutes';
		this.apiService.get(getInsUrl)
			.subscribe((response) => {
				this.institutes = response.body.elements;
				for(var i=0;i<this.institutes.length;i++) {
					if(this.institutes[i].kycStatus == "NEW") {
						this.statusNew = true;
						this.newInstitutes.push(this.institutes[i]);
						this.dataSource.data = this.newInstitutes;
					}
				}
			});
	}

	approveInstitute(insId) {
		console.log(insId);
		var data = {
				"status" : "NEW",
				"createdBy" : "cr_by",
				"updateddBy" : "up_by"
		};
		this.apiService.post('/actions' + insId, data )
			.subscribe((response) => {
				console.log(response);
			})
	}

	actions(insId, status: string) {
		this.statusChange.status = status;
		console.log(this.statusChange);
		this.apiService.post('/actions/' + insId, this.statusChange )
			.subscribe((response) => {
				console.log(response);
				this.getInstitutes();
			});
	}

	applyFilter(filterValue: string, filterType: string) {
		console.log(filterType);
		console.log(this.dataSource.data);
		// this.dataSource.filter = filterValue.trim().toLowerCase();
		// this.dataSource.filter = filterValue;
	}

	customFilterPredicate() {
		const myFilterPredicate = function(data:InsKycDetails, filter: string): boolean {
			let searchString = JSON.parse(filter);
			return data.instituteType.toString().trim().indexOf(searchString.instituteType) !== -1;
		}
		return myFilterPredicate;
	}

	goToInstUpdate(instId) {
		console.log("institute ID- "+ instId);
		this.router.navigate(['instituteKycDetails/' + instId]);
	}

}

const ELEMENT_DATA: InsKycDetails[] = [
	
		{ instituteType: 'university', instituteId: '' , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', kycStatus: 'NEW', kycAgentId: 'Sush', academicHeadName: 'Ms. Meggie', _id: 1 },
		{ instituteType: 'university', instituteId: '' , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', kycStatus: 'NEW', kycAgentId: 'Sush', academicHeadName: 'Ms. Meggie', _id: 2  }

];
