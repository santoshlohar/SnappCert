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
	displayedColumns = ['instituteId', 'deptId', 'affInstId', 'affInsName', 'affInsLocation', 'status', 'id'];
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
		this.url = '/afflInstitutes';

		this.apiService.get(this.url)
			.subscribe((response) => {
				console.log(response);
				this.affInstData = response;
				this.dataSource.data = this.affInstData;
			})
	}

	updateAffIns(row) {
		console.log(row);
		this.url = '/afflInstitutes/';
		this.apiService.put(this.url+ row._id, row)
			.subscribe((response) => {
				console.log(response);
			})
	}

}
