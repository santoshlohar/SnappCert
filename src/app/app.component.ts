import { Component } from '@angular/core';
import { Globals } from './globals';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'snapperCertificate';
	constructor( public globals: Globals) {
	}

	ngOnInit() {
	}

}