import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $;

@Component({
	selector: 'app-authorized-users',
	templateUrl: './authorized-users.component.html',
	styleUrls: ['./authorized-users.component.css']
})

export class AuthorizedUsersComponent implements OnInit {
	@ViewChild('dataTable') table: ElementRef;
	dataTable: any;
	dtOption: any;
	constructor() { }

	ngOnInit(): void {
		this.dtOption = {
			"paging": true,
			"ordering": true,
			"info": true
		};
		this.dataTable = $(this.table.nativeElement);
		this.dataTable.DataTable(this.dtOption);
	}

}
