import { Component, Input } from '@angular/core';
import { Globals } from './globals';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'snapperCertificate';
	@Input() stateRoute: string;
	constructor( public globals: Globals) {
		console.log(this.stateRoute)
	}

	ngOnInit() {
	}

}