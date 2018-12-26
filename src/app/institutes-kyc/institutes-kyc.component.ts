import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $;

@Component({
  selector: 'app-institutes-kyc',
  templateUrl: './institutes-kyc.component.html',
  styleUrls: ['./institutes-kyc.component.css']
})

export class InstitutesKycComponent implements OnInit {
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
