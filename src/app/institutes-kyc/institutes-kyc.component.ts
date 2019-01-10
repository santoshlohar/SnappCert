import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../Services/api.service';

import { InsKycDetails } from '../model/institutesKycDetails';
import { Observable } from 'rxjs';

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
	//ELEMENT_DATA: InsKycDetails[];
	approved: boolean = false; 
	institutes: InsKycDetails[];
	statusNew: boolean = false;
	newInstitutes: InsKycDetails[] = [];
	dataSource = new MatTableDataSource<InsKycDetails>(this.institutes);
	selection = new SelectionModel<InsKycDetails>(true, []);
	

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService) { }

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
		// this.apiService.post('', this.dataSource)
		// 	.subscribe((response) => {
		// 		console.log(response);
		// 	})
	}
}

const ELEMENT_DATA: InsKycDetails[] = [
	
		{ instituteType: 'university', instituteId: '' , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', kycStatus: 'NEW', kycAgentId: 'Sush', academicHeadName: 'Ms. Meggie', _id: 1 },
		{ instituteType: 'university', instituteId: '' , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', kycStatus: 'NEW', kycAgentId: 'Sush', academicHeadName: 'Ms. Meggie', _id: 2  }

];
