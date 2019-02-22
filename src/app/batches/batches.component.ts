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
	tabs = ['Batches', 'Students', 'Subjects'];
	navLinks = [];
	selected = new FormControl(0);

	asyncTabs: Observable<ExampleTab[]>;
	constructor(private router: Router) { 
		console.log(this.selected)
		// this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
		// 	setTimeout(() => {
		// 	  observer.next([
		// 		{label: 'Batches', link: '/batches/batchUploadList'},
		// 		{label: 'Students', link: '/batches/studentUploadList'},
		// 		{label: 'Subjects', link: 'Content 3'},
		// 	  ]);
		// 	}, 500);
		//   });

	}

	ngOnInit() {
	}

	link() {
		console.log("Link")
	}

	gotoBatches() {
		this.router.navigate['/batches/batchUploadList']
	}

	gotostudents() {
		this.router.navigate['/batches/studentUploadList']
	}

}

export interface ExampleTab {
	label: string;
	link: string;
}
