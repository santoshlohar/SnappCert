import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $;

@Component({
    selector: 'app-user-log',
    templateUrl: './user-log.component.html',
    styleUrls: ['./user-log.component.css']
})

export class UserLogComponent implements OnInit {
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
