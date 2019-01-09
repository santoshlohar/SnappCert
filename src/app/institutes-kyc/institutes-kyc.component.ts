import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../Services/api.service';

import { InsKycDetails } from '../model/institutesKycDetails';

@Component({
  selector: 'app-institutes-kyc',
  templateUrl: './institutes-kyc.component.html',
  styleUrls: ['./institutes-kyc.component.css']
})

export class InstitutesKycComponent implements OnInit {
	displayedColumns = [
	'position',
	'instituteType', 
	'instituteId',
	'instituteName',
	'location',
	'state',
	'requestState',
	'kycAgent',
	'requesterName',
	'actions'
	];
	//ELEMENT_DATA: InsKycDetails[];
	approved: boolean = false; 
	dataSource = new MatTableDataSource<InsKycDetails>(ELEMENT_DATA);
	selection = new SelectionModel<InsKycDetails>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		//this.getInstitutes();
	}

	// get institutes details from institutesDetails table
	getInstitutes() {
		var getInsUrl = '/institutes';
		this.apiService.get('/institutes')
			.subscribe((response) => {
				console.log(response);
			});
	}

	approveInstitute(insId) {
		console.log(insId);
		this.apiService.post('', this.dataSource)
			.subscribe((response) => {
				console.log(response);
			})
	}
}

const ELEMENT_DATA: InsKycDetails[] = [
	{position: 1, instituteType: 'university', instituteId: 100 , instituteName: 'St.Stephen', location: 'Pune', state: 'Maharashtra', requestState: 'Pune', kycAgent: 'Sush', requesterName: 'Ms. Meggie',actions: '' }
];
