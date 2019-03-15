import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
	navLinks = [
		{ path: '/batches/batchList', label: 'Batches'},
		{ path: '/batches/studentList', label: 'Students'}
	];
	constructor() { }

	ngOnInit() {
	}

}
