import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $;

@Component({
    selector: 'app-affliated-institutes',
    templateUrl: './affliated-institutes.component.html',
    styleUrls: ['./affliated-institutes.component.css']
})

export class AffliatedInstitutesComponent implements OnInit {
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
