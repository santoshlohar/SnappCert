import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	sidebar: boolean = false;
	constructor(private router: Router, private globals: Globals) { }

	ngOnInit() {
	}

	toggleSidebar() {
		if(this.globals.isSidebar == false) {
			this.globals.isSidebar = true;	
		} else {
			this.globals.isSidebar = false;
		}
	}

}
