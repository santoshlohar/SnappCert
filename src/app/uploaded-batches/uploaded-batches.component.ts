import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batches',
  templateUrl: './uploaded-batches.component.html',
  styleUrls: ['./uploaded-batches.component.css']
})
export class UploadedBatchesComponent implements OnInit {
	navLinks = [
		{ path: '/uploadedBatches/batchUploadList', label: 'Batches'},
		{ path: '/uploadedBatches/studentUploadList', label: 'Students'}
	];
	
	constructor(private router: Router) { 
	}

	ngOnInit() {
	}
}