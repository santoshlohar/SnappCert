import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { InstituteDepts } from '../../modals/institute-depts';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  displayedColumns = ['instituteId', 'deptId', 'deptName', 'status' , '_id'];
	url: string;
	Departments: InstituteDepts[] = [];
	dataSource = new MatTableDataSource<InstituteDepts>(this.Departments);
	selection = new SelectionModel<InstituteDepts>(true, []);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private apiService: ApiService,
				public dialoge: MatDialog,
				public router: Router) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
			this.getDepartments();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getDepartments() {
		console.log("Get dept");
		this.url = '/departments';
		this.apiService.get(this.url)
			.subscribe((response) => {
				console.log(response);
				this.Departments = response;
				this.dataSource.data = this.Departments;
			});
	}

	editDepartment(data) {
		console.log(data);
		var deptId = data._id;
		this.url = '/departments/';
		// this.router.navigate(['/editDepartment/', deptId ])
		this.apiService.put(this.url + deptId, data)
			.subscribe((response) => {
				console.log(response);
			})
	};

}
