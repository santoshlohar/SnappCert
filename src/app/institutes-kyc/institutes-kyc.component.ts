import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../Services/api.service';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { InsKycDetails } from '../model/institutesKycDetails';
import { Observable, from } from 'rxjs';

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

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private _formBuilder: FormBuilder,
		private apiService: ApiService) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.getInstitutes();
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
		this.dataSource.filter = filterValue.trim().toLowerCase();
		this.dataSource.filter = filterValue;
	}

}

const ELEMENT_DATA: InsKycDetails[] = [
	
		{ instituteType: 'university', instituteId: '' , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', kycStatus: 'NEW', kycAgentId: 'Sush', academicHeadName: 'Ms. Meggie', _id: 1 },
		{ instituteType: 'university', instituteId: '' , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', kycStatus: 'NEW', kycAgentId: 'Sush', academicHeadName: 'Ms. Meggie', _id: 2  }

];
