import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-certificate-upload-list',
  templateUrl: './certificate-upload-list.component.html',
  styleUrls: ['./certificate-upload-list.component.css']
})
export class CertificateUploadListComponent implements OnInit {

  displayedColumns = ['instituteId', 'affiliatedInstituteId', 'courseId', 'batchId', 'studentId', 'certificateId', 'specialization', 'scoreEarned', 'totalScore', 'cgpa', 'creditsEarned', 'completionDate', 'transactionStatus', 'failureReason', 'transactionMachine', 'transactionDate', 'transactionTime', 'transactionUser', '_id'];
  url: string;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService,
              public dialoge: MatDialog,
              public router: Router) { }

  ngOnInit() {
    
  }

}
