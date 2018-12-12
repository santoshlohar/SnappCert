import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $;

@Component({
  selector: 'app-review-marksheet-data',
  templateUrl: './review-marksheet-data.component.html',
  styleUrls: ['./review-marksheet-data.component.css']
})

export class ReviewMarksheetDataComponent implements OnInit {
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
