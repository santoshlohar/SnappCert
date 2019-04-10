import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav, MatDrawer } from '@angular/material';
import { SidebarService } from './sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	//public sidebar: any;
	@ViewChild('sidenav') public sidenav: MatSidenav;
	//@ViewChild('drawer') public drawer: MatDrawer;
	@ViewChild(MatDrawer) matDrawer: MatDrawer;
	constructor(public sidebarService: SidebarService) { 
		console.log("sidebar component");
	}

	ngOnInit() {
		console.log(this.matDrawer);
		console.log("sidebar com")
		this.sidebarService.setDrawer(this.matDrawer);
	}

}
