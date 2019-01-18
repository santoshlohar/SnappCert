import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { AffInstitutes } from '../model/aff-institutes';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
declare var $;

@Component({
    selector: 'app-affliated-institutes',
    templateUrl: './affliated-institutes.component.html',
    styleUrls: ['./affliated-institutes.component.css']
})

export class AffliatedInstitutesComponent implements OnInit {

	url;
	affInstData: AffInstitutes[] = [];
	displayedColumns = ['instituteId', 'deptId', 'affInstId', 'affInsName', 'affInsLocation', 'id'];
	dataSource = new MatTableDataSource<AffInstitutes>(this.affInstData);
	selection = new SelectionModel<AffInstitutes>(true, []);

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

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		console.log(this.selection.selected);
		return numSelected === numRows;
	}

	masterToggle() {
		console.log(this.selection);
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
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

	goToUpdateDept(id) {
		console.log(id);
		this.router.navigate(['/editAffInstitute/', id]);
	}

};

// export interface AffInstitutes {
// 	instituteId: string;
// 	position: number;
// 	affiliatedInstitute: string;
// 	affInsName: string;
// 	affInsLocation: string;
// 	deptId: number;
// 	dm1Name: string;
// 	dm1Email: string;
// 	dm1Phn: number;
// }

// const ELEMENT_DATA: AffInstitutes[] = [
// 	{ instituteId: 'Hydrogen', deptId: '111', affInstId: 'abc', affInsName: 'H', affInsLocation: 'q', id: ''}
// ];
