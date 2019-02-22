import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
	navLinks = [
		{ path: '/batches/batchUploadList', label: 'Batches'},
		{ path: '/batches/studentUploadList', label: 'Students'}
	];
	
	constructor(private router: Router) { 
	}

	ngOnInit() {
	}
}